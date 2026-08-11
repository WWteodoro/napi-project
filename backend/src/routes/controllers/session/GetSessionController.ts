import { Request, Response } from "express";
import { ISessionRepositoy } from "../../../interfaces.ts/ISessionRepository";
import { GetByNameSessionService } from "../../../services/SessionService/GetByNameSessionService";
import { GetSessionService } from "../../../services/SessionService/GetSessionService";


export class GetSessionController{
    constructor(private sessionRepo: ISessionRepositoy){}
    async handle(req: Request, res: Response): Promise<Response>{
        const { id } = req.params;

        const getSessionService = new GetSessionService(this.sessionRepo)
        const result = await getSessionService.execute({ id })

        return res.status(200).json(result)
    }
}