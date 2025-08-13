import { IAnimal, IAnimalCreateRequest } from "./IAnimalInterface";

export interface IAnimalRepository{
    findAll(): Promise<IAnimal[]>
    create(props: IAnimal): Promise<IAnimal>
    findOneAnimal(id:string): Promise<IAnimal>
    findAnimalByName(name:string):Promise<IAnimal>
    delete(id:string): Promise<void>
    update(id:string, name: string): Promise<IAnimal>
}