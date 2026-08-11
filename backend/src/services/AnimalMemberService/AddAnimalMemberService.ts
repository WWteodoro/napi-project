import { IAddAnimal, IAnimalMember } from "../../interfaces.ts/IAnimalMemberInterface";
import { IAnimalMemberRepository } from "../../interfaces.ts/IAnimalMemberRepository";

export class AddAnimalMemberService{
    constructor(private animalMemberRepo: IAnimalMemberRepository){}
    async execute({animalId, animalListId}: IAddAnimal): Promise<IAnimalMember>{
        const result = await this.animalMemberRepo.add(animalId, animalListId)

        return result
    }
}