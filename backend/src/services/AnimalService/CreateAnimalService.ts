import { Animal } from "../../entities/animal";
import { IAnimal, IAnimalCreateRequest } from "../../interfaces.ts/IAnimalInterface";
import { IAnimalRepository } from "../../interfaces.ts/IAnimalRepository";

export class CreateAnimalService{
    constructor(private animalRepo: IAnimalRepository){}
    async execute({ name }: IAnimalCreateRequest): Promise<IAnimal>{
        const animal = new Animal({name})

        const result = await this.animalRepo.create(animal.toJson())

        return result
    }
}