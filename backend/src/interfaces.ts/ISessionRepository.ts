import { ISession } from "./ISessionInterface";
import { IUser } from "./IUserInterface";

export interface ISessionRepositoy{
    findAll(): Promise<ISession[]>
    create(props: ISession): Promise<ISession>
    update(props: ISession, id:string ): Promise<ISession>
    get(id:string): Promise<ISession>
    getByName(name:string): Promise<ISession[]>
    getByUser(userId: string): Promise<ISession[]>
    addFolder(id: string, folder: string): Promise<void>
}