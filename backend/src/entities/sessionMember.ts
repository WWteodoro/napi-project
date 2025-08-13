import { ISessionMember } from "../interfaces.ts/ISessionMemberInterface";
import { createUUID } from "../utils/createUUID";

export class SessionMember{
    id: ISessionMember['id'];
    userId: ISessionMember['userId'];
    sessionId: ISessionMember['sessionId'];
    createdAt: ISessionMember['createdAt'];

    constructor(props: Omit<ISessionMember, 'id'>, id?:string){
        this.id = id || createUUID();
        this.userId = props.userId;
        this.sessionId = props.sessionId;
        this.createdAt = props.createdAt;
    }

    toJson(): ISessionMember{
        return{
            id: this.id,
            userId: this.userId,
            sessionId: this.sessionId,
            createdAt: this.createdAt
        }
    }
}