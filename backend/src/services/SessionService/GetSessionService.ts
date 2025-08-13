import { Session } from "../../entities/session";
import { ISession, ISessionGetRequest } from "../../interfaces.ts/ISessionInterface";
import { ISessionRepositoy } from "../../interfaces.ts/ISessionRepository";

export class GetSessionService{
    constructor(private sessionRepo: ISessionRepositoy){}
    async execute({id}: ISessionGetRequest): Promise<ISession>{
        const result = await this.sessionRepo.get(id)

        return result
    }
}