import { IAnimal } from "./IAnimalInterface";

export interface IAnimalList {
    id: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
export interface IAnimalListCreateRequest{
    name: string;
}

export interface IAnimalListUpdateRequest{
    id: string;
    name: string;
}

export interface IAnimalListGetRequest{
    id: string;
}

export interface IAnimalListGetByNameRequest{
    name: string;
}

export interface IAnimalListDeleteRequest{
    id:string;
}
