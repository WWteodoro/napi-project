import { IAnimalList, IAnimalListGetRequest } from "../../interfaces.ts/IAnimalListInterface";
import { IAnimalListRepository } from "../../interfaces.ts/IAnimalListRepository";

export class GetAnimalListService{
    constructor(private animalListRepo: IAnimalListRepository){}
    async execute({ id }: IAnimalListGetRequest): Promise<IAnimalList>{
        const result = await this.animalListRepo.findOne(id)

        return result
    }
}