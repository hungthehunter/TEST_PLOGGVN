import { HubSpotContact } from "../models/hubspot.schema";
import { HubSpotLocalCreateDto } from "../models/hubspot.dto";

export interface IHubSpotRepository {
    create(data: HubSpotLocalCreateDto): Promise<HubSpotContact>;
    findByHubspotId(hubspotId: string): Promise<HubSpotContact | null>;
}

// Token để Inject Dependency
export const IHubSpotRepository = Symbol('IHubSpotRepository');