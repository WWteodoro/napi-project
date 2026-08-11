import { IAnimalList, IAnimalListUpdateRequest } from "./IAnimalListInterface";

export interface IAnimalListRepository{
    findAll(): Promise<IAnimalList[]>;
    findOne(id: string): Promise<IAnimalList>;
    findByName(name: string): Promise<IAnimalList[]>
    create(props: IAnimalList): Promise<IAnimalList>;
    update(props: IAnimalListUpdateRequest, id: string): Promise<IAnimalList>;
    delete(id: string): Promise<void>
}