import { IAnimal } from "../interfaces.ts/IAnimalInterface";
import { createUUID } from "../utils/createUUID";

export class Animal{
    id:IAnimal['id']
    name: IAnimal['name'];
    createdAt: IAnimal['createdAt'];
    updatedAt: IAnimal['updatedAt'];

    constructor(props: Omit<IAnimal, 'id'>, id?:string){
        this.id = id || createUUID()
        this.name = props.name
        this.createdAt = props.createdAt || new Date();
        this.updatedAt = new Date();
    }

    toJson(): IAnimal{
        return{
            id: this.id,
            name: this.name,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt 
        }
    }
}
