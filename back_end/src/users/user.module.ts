import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// 1. Import Schema & Model bạn vừa cung cấp
import { User } from './models/users.schema';
import { UserSchema } from './models/users.model';

// 2. Import Module HubSpot (để lấy IHubSpotService)
import { HubSpotModule } from '../hubspot/hubspot.module'; // Sửa đường dẫn cho đúng với project của bạn

// 3. Import Interface & Implementation của User Service/Repo
import { IUserRepository } from './repositories/users.repositories.interface';
import { UsersRepositoryImp } from './repositories/users.repositories.imp';
import { IUserService } from './services/users.services.interface';
import { UserServiceImp } from './services/users.services.imp';
import { UserController } from './controllers';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    HubSpotModule, 
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_SECRET'),
        signOptions: { expiresIn: '30m' },
      }),
    }),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: IUserRepository,
      useClass: UsersRepositoryImp,
    },
    {
      provide: IUserService,
      useClass: UserServiceImp,
    },
  ],
  exports: [
    IUserService, JwtModule
  ],
})
export class UsersModule {}