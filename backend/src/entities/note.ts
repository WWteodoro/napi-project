import { INote } from "../interfaces.ts/INoteInterface";
import { createUUID } from "../utils/createUUID";

export class Note{
    id: INote['id'];
    quantity: INote['quantity'];
    dateTime: INote['dateTime'];
    location: INote['location'];
    content: INote['content'];
    animal: INote['animal'];
    userId: INote['userId'];
    boundingBoxId: INote['boundingBoxId'];
    createdAt?: INote['createdAt'];
    updatedAt?: INote['updatedAt'];

    constructor(props: Omit<INote, 'id'>, id?:string){
        this.id = id || createUUID();
        this.quantity = props.quantity;
        this.dateTime = props.dateTime;
        this.location = props.location;
        this.content = props.content || " ";
        this.animal = props.animal;
        this.userId = props.userId;
        this.boundingBoxId = props.boundingBoxId;
        this.createdAt = props.createdAt || new Date();
        this.updatedAt = new Date();
    }

    toJson(): INote{
        return{
            id: this.id,
            quantity: this.quantity,
            dateTime: this.dateTime,
            location: this.location,
            content: this.content,
            animal: this.animal,
            userId: this.userId,
            boundingBoxId: this.boundingBoxId,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }
    }
}