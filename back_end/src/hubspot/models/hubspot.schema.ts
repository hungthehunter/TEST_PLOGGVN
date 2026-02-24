import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';
export type hubspotDocument =  Document;

@Schema({ collection: 'hubspot_contacts', timestamps: true})
export class HubSpotContact {

    @Prop({ required: true})
    hubspotId: string;

    @Prop()
    portalId: string;

    @Prop()
    profileUrl: string;

    @Prop({ type: mongoose.Schema.Types.Mixed, select: false })
    rawProperties?: Record<string, any>;
}
