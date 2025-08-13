import { Animal } from "../../entities/animal";
import { IAnimal, IAnimalUpdateRequest } from "../../interfaces.ts/IAnimalInterface";
import { IAnimalRepository } from "../../interfaces.ts/IAnimalRepository";

export class UpdateAnimalService{
    constructor(private animalRepo: IAnimalRepository){}
    async execute({ id, name}: IAnimalUpdateRequest): Promise<IAnimal>{
    const result = await this.animalRepo.findOneAnimal(id)
    
    const animal = new Animal({
        name: name || result.name
    }, result.id)

    await this.animalRepo.update(id, name)

    return animal;
}
}