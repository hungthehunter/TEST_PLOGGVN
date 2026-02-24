import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; // Module để gọi API
import { ConfigModule } from '@nestjs/config'; // Module để đọc .env
import { HubSpotServiceImp } from './services/hubspot.services.imp';
import { IHubSpotService } from './services/hubspot.services.interface';
import { HubSpotController } from './controllers/hubspots.controller';

@Module({
  imports: [
    HttpModule,   
    ConfigModule, 
  ],
  controllers: [HubSpotController],
  providers: [
    {
      provide: IHubSpotService,     
      useClass: HubSpotServiceImp,   
    },
  ],
  exports: [
    IHubSpotService,
  ],
})
export class HubSpotModule {}