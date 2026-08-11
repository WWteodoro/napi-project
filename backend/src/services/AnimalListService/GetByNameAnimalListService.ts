import { IAnimalList, IAnimalListGetByNameRequest } from "../../interfaces.ts/IAnimalListInterface";
import { IAnimalListRepository } from "../../interfaces.ts/IAnimalListRepository";

export class GetByNameAnimalListService{
    constructor(private animalListRepo: IAnimalListRepository){}
    async execute({name}: IAnimalListGetByNameRequest): Promise<any>{
        const result = await this.animalListRepo.findByName(name)

        return result
    }
}