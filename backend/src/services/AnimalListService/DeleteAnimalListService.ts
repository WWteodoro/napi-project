import { IAnimalListDeleteRequest } from "../../interfaces.ts/IAnimalListInterface";
import { IAnimalListRepository } from "../../interfaces.ts/IAnimalListRepository";

export class DeleteAnimalListService{
    constructor(private animalListRepo: IAnimalListRepository){}
    async execute({ id }: IAnimalListDeleteRequest): Promise<void>{
        console.log(id)
        await this.animalListRepo.findOne(id)
        await this.animalListRepo.delete(id)
    }
}