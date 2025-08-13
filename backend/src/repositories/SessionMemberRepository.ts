import { PrismaClient } from "@prisma/client";
import { ISessionMemberRepositoy } from "../interfaces.ts/ISessionMemberRepository";
import { ISessionMember } from "../interfaces.ts/ISessionMemberInterface";
import { IUser } from "../interfaces.ts/IUserInterface";

const prisma = new PrismaClient();
export class SessionMemberRepository implements ISessionMemberRepositoy{
    constructor(){
        
    }
    ListSessionUsers(id: string): Promise<IUser> {
        throw new Error("Method not implemented.");
    }
    addUser(props: ISessionMember): Promise<ISessionMember> {
        throw new Error("Method not implemented.");
    }
    remove(userId: string, sessionaId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getMemberByName(name: string): Promise<ISessionMember> {
        throw new Error("Method not implemented.");
    }
}