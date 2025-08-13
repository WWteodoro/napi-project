import { ISessionMember } from "./ISessionMemberInterface"
import { IUser } from "./IUserInterface"

export interface ISessionMemberRepositoy{
    addUser(props: ISessionMember): Promise<ISessionMember>
    remove(userId: string, sessionaId: string): Promise<void>
    getMemberByName(name: string): Promise<ISessionMember>
    ListSessionUsers(id:string): Promise<IUser>
}