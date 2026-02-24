import { SignUpDto, LoginDto } from "../models/users.dto";
import { User } from "../models/users.schema";

export interface IUserService {
    signUp(dto: SignUpDto): Promise<User>;
    findAll(): Promise<User[]>;
    signIn(dto: LoginDto): Promise<any>;
    findOne(id: string): Promise<User>;
    update(id: string, dto: Partial<SignUpDto>): Promise<User>;
    delete(id: string): Promise<void>;
    refreshToken(token: string): Promise<any>;
}

export const IUserService = Symbol('IUserService')