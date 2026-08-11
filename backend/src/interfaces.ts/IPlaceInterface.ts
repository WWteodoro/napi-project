export interface IPlace{
    id:string;
    name: string;   
    createdAt?: Date;
}

export interface IPlaceCreateRequest{
    name: string;   
    createdAt?: Date;
}

export interface IPlaceGetRequest{
    id:string;
}

export interface IPlaceGetByNameRequest{
    name:string
}

export interface IPlaceUpdateRequest{
    id: string;
    name: string
}

export interface IPlaceDeleteRequest{
    id:string
}