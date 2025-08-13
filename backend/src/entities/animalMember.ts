import { IAnimalMember } from "../interfaces.ts/IAnimalMemberInterface";
import { createUUID } from "../utils/createUUID";

export class AnimalMember{
    id: IAnimalMember['id']
    animalListId: IAnimalMember['animalListId'];
    animalId: IAnimalMember['animalId']
    createdAt: IAnimalMember['createdAt'];
    updatedAt: IAnimalMember['updatedAt'];

    constructor(props: Omit<AnimalMember, 'id'>, id?: string){
        this.id = id || createUUID()
        this.animalListId = props.animalListId
        this.animalId = props.animalId
        this.createdAt = props.createdAt || new Date();
        this.updatedAt = new Date();
    }

    toJson(): IAnimalMember{
        return{
            id: this.id,
            animalListId: this.animalListId,
            animalId: this.animalId,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt 
        }
    }

}