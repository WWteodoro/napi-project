export interface IAnimal{
    id: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IAnimalCreateRequest{
    name: string;
}

export interface IAnimalGetRequest{
    id: string;
}

export interface IAnimalGetByNameRequest{
    name: string;
}

export interface IAnimalDeleteRequest{
    id:string;
}

export interface IAnimalUpdateRequest{
    id: string;
    name:string;
}