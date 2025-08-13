import { IAnimal } from "./IAnimalInterface";
import { IAnimalMember } from "./IAnimalMemberInterface";

export interface IAnimalMemberRepository{
    findAll(): Promise<IAnimalMember[]>;
    add(animalId: string, animalListId: string): Promise<IAnimalMember>
    remove(id: string, animalListId: string): Promise<void>
    list(animalListId: string): Promise<any[]>
}