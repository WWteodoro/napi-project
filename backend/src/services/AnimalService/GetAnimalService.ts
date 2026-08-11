import { AppError } from "../../errors/AppError";
import { IAnimal, IAnimalGetRequest } from "../../interfaces.ts/IAnimalInterface";
import { IAnimalRepository } from "../../interfaces.ts/IAnimalRepository";

export class GetAnimalService{
    constructor(private animalRepo: IAnimalRepository){}
    async execute({id}: IAnimalGetRequest): Promise<IAnimal>{
        const result = await this.animalRepo.findOneAnimal(id)
        if(!result) throw new AppError("Animal not found");
        return result
    }
}