import { AppError } from "../../errors/AppError";
import { IAnimal } from "../../interfaces.ts/IAnimalInterface";
import { IAnimalRepository } from "../../interfaces.ts/IAnimalRepository";

export class ListAnimalService{
    constructor(private animalRepo: IAnimalRepository){}
    async execute(): Promise<IAnimal[]>{
        const result = await this.animalRepo.findAll()
        if(!result) throw new AppError("Animal not found");
        return result
    }
}