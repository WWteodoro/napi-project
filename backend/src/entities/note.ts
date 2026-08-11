import { INote } from "../interfaces.ts/INoteInterface";
import { createUUID } from "../utils/createUUID";

export class Note{
    id: INote['id'];
    quantity: INote['quantity'];
    dateTime: INote['dateTime'];
    content: INote['content'];
    animal: INote['animal'];
    userId: INote['userId'];
    videoId: INote['videoId'];
    time: INote['time']
    createdAt?: INote['createdAt'];
    updatedAt?: INote['updatedAt'];

    constructor(props: Omit<INote, 'id'>, id?:string){
        this.id = id || createUUID();
        this.quantity = props.quantity;
        this.dateTime = props.dateTime;
        this.content = props.content || " ";
        this.animal = props.animal;
        this.userId = props.userId;
        this.videoId = props.videoId;
        this.time = props.time
        this.createdAt = props.createdAt || new Date();
        this.updatedAt = new Date();
    }

    toJson(): INote{
        return{
            id: this.id,
            quantity: this.quantity,
            dateTime: this.dateTime,
            content: this.content,
            animal: this.animal,
            userId: this.userId,
            videoId: this.videoId,
            time: this.time,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }
    }
}