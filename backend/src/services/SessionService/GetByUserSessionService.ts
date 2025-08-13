import { Session } from "../../entities/session";
import { ISession, ISessionGetByUserRequest } from "../../interfaces.ts/ISessionInterface";
import { ISessionRepositoy } from "../../interfaces.ts/ISessionRepository";

export class GetByUserSessionService{
    constructor(private sessionRepo: ISessionRepositoy){}
    async execute({userId}: ISessionGetByUserRequest ): Promise<ISession[]>{
        const result = await this.sessionRepo.getByUser(userId)

        return result
    }
}