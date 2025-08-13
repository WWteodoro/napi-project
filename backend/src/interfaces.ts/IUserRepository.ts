import { IUser } from "./IUserInterface";

export interface IUserRepository{
    findAll(): Promise<IUser[]>
    findOneUser(id: string): Promise<IUser>
    insert(props: IUser): Promise<IUser>
    update(props: IUser, id: string): Promise<IUser>
    delete(id: string): Promise<void>
    findUserByName(name: string): Promise<IUser>
}