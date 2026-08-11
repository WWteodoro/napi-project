export interface IUser{
    id: string;
    name: string;
    password: string;    
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUserCreateRequest{
    name: string;
    password: string;    
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUserGetRequest {
    id: string;
}

export interface IUserGetByNameRequest {
    name: string;
}

export interface IUserUpdateRequest{
    id: string;
    name: string;
    password: string;
    confirmEmail?: string;
    confirmPassword?: string;
}

export interface IUserDeleteRequest{
    id: string;
}

export interface IUserAuthenticateRequest {
    name    : string;
    password : string;
}
