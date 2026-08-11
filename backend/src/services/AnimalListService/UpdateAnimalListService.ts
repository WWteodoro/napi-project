import { AnimalList } from "../../entities/animalList";
import { IAnimalList, IAnimalListUpdateRequest } from "../../interfaces.ts/IAnimalListInterface";
import { IAnimalListRepository } from "../../interfaces.ts/IAnimalListRepository";

export class UpdateAnimalListService{
    constructor(private animalListRepo: IAnimalListRepository){}
    async execute({id, name}: IAnimalListUpdateRequest): Promise<IAnimalList>{
        const actual = await this.animalListRepo.findOne(id)

        const animalList = new AnimalList({
            name: name || actual.name
        }, actual.id)
        const result = await this.animalListRepo.update(animalList.toJson(), id)

        return result
    }
}