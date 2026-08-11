import { IAnimalMember, IListMembers } from "../../interfaces.ts/IAnimalMemberInterface"
import { IAnimalMemberRepository } from "../../interfaces.ts/IAnimalMemberRepository"

export class ListAnimalMemberService{
    constructor(private animalMemberRepo: IAnimalMemberRepository){}
    async execute({animalListId}: IListMembers): Promise<IAnimalMember[]>{
        const result = await this.animalMemberRepo.list(animalListId)

        return result
    }
}