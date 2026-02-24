import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs'; // Chuyển Observable sang Promise
import { IHubSpotService, HubSpotContactDto } from './hubspot.services.interface';

@Injectable()
export class HubSpotServiceImp implements IHubSpotService {
    private readonly baseUrl = 'https://api.hubapi.com/crm/v3/objects/contacts';
    private readonly mailUrl = 'https://api.hubapi.com/marketing/v3/transactional/single-send/tokens/send';

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {}

    private get headers() {
        const token = this.configService.get<string>('HUBSPOT_ACCESS_TOKEN');
        if (!token) {
            console.warn('Warning: Cannot find HUBSPOT_ACCESS_TOKEN in .env');
        }
        return {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
    }

    async createContact(contact: HubSpotContactDto): Promise<any> {
        const hubSpotPayload = {
            properties: {
                email: contact.email,
                firstname: contact.firstName,
                lastname: contact.lastName
            }
        };

        try {
            const response = await firstValueFrom(
                this.httpService.post(this.baseUrl, hubSpotPayload, { headers: this.headers })
            );
            return response.data;

        } catch (error: any) {
            console.error('Error fetching HubSpot API:', error.response?.data || error.message);
            throw new HttpException({
                status: HttpStatus.BAD_GATEWAY,
                error: 'Cannot create Contact on HubSpot',
                details: error.response?.data
            }, HttpStatus.BAD_GATEWAY);
        }
    }

    async getContact(contactId: string): Promise<any> {
        try {
            const url = `${this.baseUrl}/${contactId}`;
            const response = await firstValueFrom(
                this.httpService.get(url, { headers: this.headers })
            );
            return response.data;
        } catch (error: any) {
            this.handleError(error, `Cannot get Contact ${contactId}`);
        }
    }

    async updateContact(contactId: string, contact: Partial<HubSpotContactDto>): Promise<any> {
        try {
            const url = `${this.baseUrl}/${contactId}`;
            const hubSpotPayload = {
                properties: {
                    ...(contact.email && { email: contact.email }),
                    ...(contact.firstName && { firstname: contact.firstName }),
                    ...(contact.lastName && { lastname: contact.lastName }),
                }
            };
            const response = await firstValueFrom(
                this.httpService.patch(url, hubSpotPayload, { headers: this.headers })
            );
            return response.data;
        } catch (error: any) {
            this.handleError(error, `Cannot update Contact ${contactId}`);
        }
    }

    async deleteContact(contactId: string): Promise<void> {
        try {
            const url = `${this.baseUrl}/${contactId}`;
            await firstValueFrom(
                this.httpService.delete(url, { headers: this.headers })
            );
        } catch (error: any) {
            this.handleError(error, `Cannot delete Contact ${contactId}`);
        }   
    }

    async sendTransactionalEmail(emailId: string, recipientEmail: string, customTokens?: Record<string, string>): Promise<any> {
        const payload = {
            emailId: emailId,
            message: {
                to: recipientEmail,
            },
            contactProperties: customTokens 
        };

        try {
            const response = await firstValueFrom(
                this.httpService.post(this.mailUrl, payload, { headers: this.headers })
            );
            return response.data;
        } catch (error: any) {
            this.handleError(error, 'Failed to send transactional email');
        }
    }

    private handleError(error: any, customMessage: string) {
        console.error(`${customMessage}:`, error.response?.data || error.message);
        throw new HttpException({
            status: HttpStatus.BAD_GATEWAY,
            error: customMessage,
            details: error.response?.data
        }, HttpStatus.BAD_GATEWAY);
    }
    
}