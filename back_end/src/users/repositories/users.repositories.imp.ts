import {  IUserRepository, IUsersRepository } from "./users.repositories.interface"// Adjust the path based on where UserCreateParams and User are defined
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator"
import { User } from "../models/users.schema"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { hotspotContactDto, SignUpDto } from "../models/users.dto"

@Injectable()
export class UsersRepositoryImp implements IUsersRepository{

    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>
    ){}

    async create(user: SignUpDto): Promise<User> {
            const createdUser = new this.userModel(user);
            return createdUser.save();
    }
    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).lean().exec();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findById(id: string): Promise<User | null> {
        return this.userModel.findById(id).exec();
    }

    async update(id: string, data: Partial<User>): Promise<User | null> {
        return this.userModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async delete(id: string): Promise<void> {
        await this.userModel.findByIdAndDelete(id).exec();
    }

    async updateHubspotContactId(userId: string, hubspotContactId: string): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(
        userId,
        { hubspotContactId: hubspotContactId },
        { new: true }
    ).exec();
}
    
}