
export interface HubSpotContactDto {
    email: string;
    firstName: string;
    lastName: string;
}

export interface IHubSpotService {
    createContact(contact: HubSpotContactDto): Promise<any>;
    getContact(contactId: string): Promise<any>;
    updateContact(contactId: string, contact: Partial<HubSpotContactDto>): Promise<any>;
    deleteContact(contactId: string): Promise<void>;
    sendTransactionalEmail(emailId: string, recipientEmail: string, customTokens?: Record<string, string>): Promise<any>;
}

export const IHubSpotService = Symbol('IHubSpotService');