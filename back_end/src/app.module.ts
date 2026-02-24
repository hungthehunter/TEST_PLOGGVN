
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { HubSpotController } from './hubspot/controllers/hubspots.controller';
import { HubSpotServiceImp } from './hubspot/services/hubspot.services.imp';
import { UserController } from './users/controllers/users.controller';
import { UserServiceImp } from './users/services';
import { UsersModule } from './users/user.module';
import { HubSpotModule } from './hubspot/hubspot.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }), 
    DatabaseModule,
    HttpModule,
    UsersModule,
    HubSpotModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
