import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { HubSpotContact } from "../models/hubspot.schema";
import { IHubSpotRepository } from "./hubspot.repositories.interface";
import { HubSpotLocalCreateDto } from "../models/hubspot.dto";

@Injectable()
export class HubSpotRepositoryImp implements IHubSpotRepository {
    constructor(
        @InjectModel(HubSpotContact.name)
        private readonly hubSpotModel: Model<HubSpotContact>
    ) {}

    async create(data: HubSpotLocalCreateDto): Promise<HubSpotContact> {
        const newRecord = new this.hubSpotModel(data);
        return newRecord.save();
    }

    async findByHubspotId(hubspotId: string): Promise<HubSpotContact | null> {
        return this.hubSpotModel.findOne({ hubspotId }).exec();
    }
}