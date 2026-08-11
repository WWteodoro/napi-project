import { IAnimalList } from "../interfaces.ts/IAnimalListInterface";
import { createUUID } from "../utils/createUUID";

export class AnimalList{
    id: IAnimalList['id']
    name: IAnimalList['name']
    createdAt: IAnimalList['createdAt'];
    updatedAt: IAnimalList['updatedAt'];
    
    constructor(props: Omit<IAnimalList, 'id'>, id?: string){
        this.id = id || createUUID();
        this.name = props.name;
        this.createdAt = props.createdAt || new Date();
        this.updatedAt = new Date();
    }

    toJson(): IAnimalList{
        return{
            id: this.id,
            name: this.name,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt 
        }
    }
}