export interface SignUpDto {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface hotspotContactDto{
    email: string;
    firstName: string;
    lastName: string;
    hubspotContactId?: any;
}