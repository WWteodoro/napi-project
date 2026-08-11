import { Session } from "../../entities/session";
import { ISession, ISessionCreateRequest } from "../../interfaces.ts/ISessionInterface";
import { ISessionRepositoy } from "../../interfaces.ts/ISessionRepository";

export class CreateSessionService{
    constructor(private sessionRepo: ISessionRepositoy){}
    async execute(data: ISessionCreateRequest): Promise<ISession>{
        const session = new Session(data)

        const result = await this.sessionRepo.create(session.toJson())

        return result
    }
}