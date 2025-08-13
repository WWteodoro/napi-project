import { Session } from "../../entities/session";
import { ISession, ISessionUpdateRequest } from "../../interfaces.ts/ISessionInterface";
import { ISessionRepositoy } from "../../interfaces.ts/ISessionRepository";

export class UpdateSessionService{
    constructor(private sessionRepo: ISessionRepositoy){}
    async execute({id, name}: ISessionUpdateRequest): Promise<ISession>{
        const result = await this.sessionRepo.get(id)

        const newSession = new Session({
            name: name || result.name,
            animalListId: result.animalListId, 
            userId: result.userId
        }, result.id)

        const result2 = await this.sessionRepo.update(newSession.toJson(), id)

        return result2
    }
}