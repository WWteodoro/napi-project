import { ISessionAddFolderRequest } from "../../interfaces.ts/ISessionInterface";
import { ISessionRepositoy } from "../../interfaces.ts/ISessionRepository";

export class AddFolderSessionService{
    constructor(private sessionRepo: ISessionRepositoy){}
    async execute({id, folder}: ISessionAddFolderRequest): Promise<void>{
        await this.sessionRepo.get(id)
        await this.sessionRepo.addFolder(id, folder)
    }
}