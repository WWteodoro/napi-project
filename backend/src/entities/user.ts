import { IUser } from "../interfaces.ts/IUserInterface";
import { createUUID } from "../utils/createUUID";

export class User{
    id: string;
    name: IUser['name'];
    password: IUser['password'];
    createdAt: IUser['createdAt'];
    updatedAt: IUser['updatedAt'];

    constructor(props: Omit<IUser, 'id'>, id?: string){
        this.id = id || createUUID();
        this.name = props.name;
        this.password = props.password;
        this.createdAt = props.createdAt || new Date();
        this.updatedAt = new Date();
    }

    toJson(): IUser{
        return{
            id: this.id,
            name: this.name,
            password: this.password,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt 
        }
    }

}