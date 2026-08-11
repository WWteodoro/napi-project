import { IPlace } from "../interfaces.ts/IPlaceInterface";
import { createUUID } from "../utils/createUUID";

export class Place{
    id: string;
    name: IPlace['name'];
    createdAt: IPlace['createdAt']

    constructor(props: Omit<IPlace, 'id'>, id?: string){
        this.id = id || createUUID()
        this.name = props.name;
        this.createdAt = props.createdAt || new Date()
    }

    toJson(): IPlace{
        return{
            id: this.id,
            name: this.name,
            createdAt: this.createdAt,
        }
    }
}