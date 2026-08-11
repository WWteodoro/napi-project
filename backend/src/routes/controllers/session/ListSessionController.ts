import { Request, Response } from "express";
import { ISessionRepositoy } from "../../../interfaces.ts/ISessionRepository";
import { ListSessionService } from "../../../services/SessionService/ListSessionService";


export class ListSessionController{
    constructor(private sessionRepo: ISessionRepositoy){}
    async handle(req: Request, res: Response): Promise<Response>{
        const listSessionService = new ListSessionService(this.sessionRepo)
        const sessions = await listSessionService.execute()

        return res.json(sessions)
    }
}