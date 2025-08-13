export interface IAnimalMember{
    id: string;
    animalListId: string;
    animalId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IAddAnimal{
    animalListId: string;
    animalId: string;
}

export interface IRemoveAnimal{
    id: string;
    animalListId: string;
}

export interface IListMembers{
    animalListId: string;
}