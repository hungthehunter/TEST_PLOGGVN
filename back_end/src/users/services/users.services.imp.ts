import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { IUserService } from './users.services.interface';
import { IUserRepository} from '../repositories/users.repositories.interface';
import { User } from '../models/users.schema';
import { SignUpDto } from '../models/users.dto';
import { IHubSpotService } from '../../hubspot/services/hubspot.services.interface';
import type { IUsersRepository } from '../repositories/users.repositories.interface';
import { LoginDto } from '../models/users.dto';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';

@Injectable()
export class UserServiceImp implements IUserService {
    constructor(
        @Inject(IUserRepository)
        private readonly usersRepository: IUsersRepository,
        @Inject(IHubSpotService)
        private readonly hubSpotService: IHubSpotService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ) {}

    async signUp(dto: SignUpDto): Promise<User> {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(dto.password, saltOrRounds);
        const newUser = await this.usersRepository.create({
            email: dto.email,
            firstName: dto.firstName,
            lastName: dto.lastName,
            password: hashedPassword
        });

        try {
            const hubspotContact = await this.hubSpotService.createContact({
                email: dto.email,
                firstName: dto.firstName,
                lastName: dto.lastName
            });

            if (hubspotContact && hubspotContact.id) {
            await this.usersRepository.updateHubspotContactId(newUser['_id'].toString(), hubspotContact.id);
            newUser.hubspotContactId = hubspotContact.id; 
            const REGISTRATION_EMAIL_ID = this.configService.get<string>('EMAIL_REGISTRATION_ID') ?? ''; 
            await this.sendEmailNotification(REGISTRATION_EMAIL_ID, dto.email, {
            firstname: dto.firstName
        });
    }
        } catch (error) {
            console.error('Error asyncing HubSpot:', error.message);
        }

        return newUser;
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.findAll();
    }

    async findOne(id: string): Promise<User> {
        const user = await this.usersRepository.findById(id);
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async update(id: string, dto: Partial<SignUpDto>): Promise<User> {
        const updatedUser = await this.usersRepository.update(id, dto);
        if (!updatedUser) throw new NotFoundException('User not found');

        if (updatedUser.hubspotContactId) {
            try {
                await this.hubSpotService.updateContact(updatedUser.hubspotContactId.hubspotId, {
                    email: dto.email,
                    firstName: dto.firstName,
                    lastName: dto.lastName
                });
            } catch (error) {
                console.error('Error asyncing HubSpot:', error.message);
            }
        }
        return updatedUser;
    }

    async delete(id: string): Promise<void> {
        const user = await this.findOne(id);

        if (user.hubspotContactId) {
            try {
                await this.hubSpotService.deleteContact(user.hubspotContactId.hubspotId);
            } catch (error) {
                console.error('Error deleting contact on HubSpot:', error.message);
            }
        }

        await this.usersRepository.delete(id);
    }

// users.services.imp.ts

async signIn(dto: LoginDto): Promise<any> {
    const user = await this.usersRepository.findByEmail(dto.email);

    if (!user) {
        throw new UnauthorizedException('Email or password is incorrect');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);

    if (!isMatch) {
        throw new UnauthorizedException('Email or password is incorrect');
    }

    const { password, ...result } = user;

    const accessToken = await this.jwtService.signAsync(
        { sub: result._id, email: result.email },
        { 
            secret: this.configService.get<string>('JWT_ACCESS_SECRET'), 
            expiresIn: '30m' 
        }
    );

    const refreshToken = await this.jwtService.signAsync(
        { sub: result._id },
        { 
            secret: this.configService.get<string>('JWT_REFRESH_SECRET'), 
            expiresIn: '7d' 
        }
    );

    try {
        const LOGIN_EMAIL_ID = this.configService.get<string>('EMAIL_LOGIN_ID') ?? '';
        await this.sendEmailNotification(LOGIN_EMAIL_ID, user.email, {
            firstname: user.firstName,
            last_login: new Date().toLocaleString()
        });
        console.log(`Sending mail login notification to: ${user.email}`);
    } catch (error) {
        console.error('Error sending login notification email:', error.message);
    }

    return {
        status: 'OK',
        message: 'Login successful',
        data: {
            user: result,
            backend_token: {
                accessToken,
                refreshToken
            }
        }
    };
}

    private async sendEmailNotification(
    emailId: string,
    email: string,
    tokens: Record<string, string>
    ) {
    try {
        await this.hubSpotService.sendTransactionalEmail(emailId, email, tokens);
        console.log(`[HubSpot] Email ${emailId} sent successfully to: ${email}`);
    } catch (error) {
        console.error(`[HubSpot] Failed to send email ${emailId}:`, error.message);
    }
    }

    async refreshToken(token: string): Promise<any> {
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_REFRESH_SECRET,
            });
            const user = await this.usersRepository.findById(payload.sub);
            if (!user) {
                throw new UnauthorizedException('User does not exist');
            }

            // 3. Tạo Access Token mới
            const newAccessToken = await this.jwtService.signAsync(
                { sub: user['_id'], email: user.email },
                { secret: process.env.JWT_ACCESS_SECRET, expiresIn: '30m' }
            );

            return {
                status: 'OK',
                message: 'Token refreshed successfully',
                data: {
                    accessToken: newAccessToken,
                }
            };
        } catch (error) {
            throw new UnauthorizedException('Refresh Token is invalid or expired');
        }
    }

    
}