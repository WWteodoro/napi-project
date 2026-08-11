import { ISessionDeleteRequest } from "../../interfaces.ts/ISessionInterface";
import { ISessionRepositoy } from "../../interfaces.ts/ISessionRepository";

export class DeleteSessionService{
    constructor(private sessionRepo: ISessionRepositoy){}
    async execute({id}: ISessionDeleteRequest): Promise<void>{
        await this.sessionRepo.delete(id)
    }
}