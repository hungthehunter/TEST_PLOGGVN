import { SchemaFactory } from "@nestjs/mongoose";
import { User } from "./users.schema";

export const UserSchema = SchemaFactory.createForClass(User);