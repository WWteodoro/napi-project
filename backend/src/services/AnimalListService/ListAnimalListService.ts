import { IAnimalList } from "../../interfaces.ts/IAnimalListInterface";
import { IAnimalListRepository } from "../../interfaces.ts/IAnimalListRepository";

export class ListAnimalListService{
    constructor(private animalListRepo: IAnimalListRepository){}
    async execute():Promise<IAnimalList[]>{
        const result = await this.animalListRepo.findAll()

        return result
    }
}