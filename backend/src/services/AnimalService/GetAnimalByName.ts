import { AppError } from "../../errors/AppError";
import { IAnimal, IAnimalGetByNameRequest } from "../../interfaces.ts/IAnimalInterface";
import { IAnimalRepository } from "../../interfaces.ts/IAnimalRepository";

export class GetAnimalByNameService{
    constructor(private animalRepo: IAnimalRepository){}
    async execute({name}: IAnimalGetByNameRequest): Promise<IAnimal>{
        const result = await this.animalRepo.findAnimalByName(name)
        if(!result) throw new AppError("Animal not found");
        return result
    }
}