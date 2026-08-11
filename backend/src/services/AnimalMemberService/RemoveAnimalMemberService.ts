import { IAnimalMember, IRemoveAnimal } from "../../interfaces.ts/IAnimalMemberInterface"
import { IAnimalMemberRepository } from "../../interfaces.ts/IAnimalMemberRepository"

export class RemoveAnimalMemberService{
    constructor(private animalMemberRepo: IAnimalMemberRepository){}
    async execute({id, animalListId}: IRemoveAnimal): Promise<void>{
        await this.animalMemberRepo.remove(id, animalListId)

    }
}