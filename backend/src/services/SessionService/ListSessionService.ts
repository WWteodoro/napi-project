import { Session } from "../../entities/session";
import { ISession } from "../../interfaces.ts/ISessionInterface";
import { ISessionRepositoy } from "../../interfaces.ts/ISessionRepository";

export class ListSessionService{
    constructor(private sessionRepo: ISessionRepositoy){}
    async execute(): Promise<ISession[]>{
        const result = await this.sessionRepo.findAll()

        return result
    }
}