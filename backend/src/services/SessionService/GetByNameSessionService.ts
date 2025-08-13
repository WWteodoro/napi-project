import { Session } from "../../entities/session";
import { ISession, ISessionGetByNameRequest } from "../../interfaces.ts/ISessionInterface";
import { ISessionRepositoy } from "../../interfaces.ts/ISessionRepository";

export class GetByNameSessionService{
    constructor(private sessionRepo: ISessionRepositoy){}
    async execute({name}: ISessionGetByNameRequest): Promise<ISession[]>{
        const result = await this.sessionRepo.getByName(name)

        return result
    }
}