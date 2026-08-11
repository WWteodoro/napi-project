import { IAnimalDeleteRequest } from "../../interfaces.ts/IAnimalInterface";
import { IAnimalRepository } from "../../interfaces.ts/IAnimalRepository";

export class DeleteAnimalService{
    constructor(private animalRepo: IAnimalRepository){}

    async execute ({ id }: IAnimalDeleteRequest): Promise<void>{
        await this.animalRepo.findOneAnimal(id)
        await this.animalRepo.delete(id)
    }
}