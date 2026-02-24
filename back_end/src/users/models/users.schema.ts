import { Schema } from "@nestjs/mongoose";
import { Prop } from '@nestjs/mongoose';
import mongoose from "mongoose";
import { HubSpotContact } from "src/hubspot/models";
import { Document } from 'mongoose';
@Schema({ collection: 'users', timestamps: true})
export class User extends Document {
    @Prop({ required: true})
    firstName: string;

    @Prop({ required: true})
    lastName: string;

    @Prop({ required: true, unique: true})
    email: string;

    @Prop()
    password: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'hubspot_contacts'})
    hubspotContactId: HubSpotContact;
}

