import { SignUpDto } from "../models/users.dto";
import { User } from "../models/users.schema";

export interface IUsersRepository {
    create(user: SignUpDto): Promise<User>;
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    update(id: string, data: Partial<User>): Promise<User | null>;
    delete(id: string): Promise<void>;
    updateHubspotContactId(userId: string, hubspotContactId: string): Promise<User | null>;
}

export const IUserRepository = Symbol('IUserRepository');
