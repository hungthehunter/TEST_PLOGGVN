import { SchemaFactory } from "@nestjs/mongoose";
import { HubSpotContact } from "./hubspot.schema";
export const HubSpotSchema = SchemaFactory.createForClass(HubSpotContact);