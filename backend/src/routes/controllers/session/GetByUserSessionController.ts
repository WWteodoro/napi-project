import { Request, Response } from "express";
import { ISessionRepositoy } from "../../../interfaces.ts/ISessionRepository";
import { GetByNameSessionService } from "../../../services/SessionService/GetByNameSessionService";
import { GetByUserSessionService } from "../../../services/SessionService/GetByUserSessionService";


export class GetByUserSessionController{
    constructor(private sessionRepo: ISessionRepositoy){}
    async handle(req: Request, res: Response): Promise<Response>{
        const { userId } = req.params;

        const getByUserSessionService = new GetByUserSessionService(this.sessionRepo)
        const result = await getByUserSessionService.execute({ userId })

        return res.status(200).json(result)
    }
}