export interface signUpData { firstName: string; lastName: string; email: string; password: string; confirmPassword?: string; }
export interface loginData {  email: string; password: string; }
export interface ApiResponse <T = any>{    status: string; message?: string; access_token?: string; data?: T; }