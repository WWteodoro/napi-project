import { AnimalList } from "../../entities/animalList";
import { IAnimalList, IAnimalListCreateRequest } from "../../interfaces.ts/IAnimalListInterface";
import { IAnimalListRepository } from "../../interfaces.ts/IAnimalListRepository";

export class CreateAnimalListService{
    constructor(private animalListRepo: IAnimalListRepository){}
    async execute({ name }: IAnimalListCreateRequest): Promise<IAnimalList>{
        const animalList = new AnimalList({ name })

        const result = await this.animalListRepo.create(animalList.toJson())

        return result
    }
}