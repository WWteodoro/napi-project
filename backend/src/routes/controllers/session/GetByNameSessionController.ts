import { Request, Response } from "express";
import { ISessionRepositoy } from "../../../interfaces.ts/ISessionRepository";
import { GetByNameSessionService } from "../../../services/SessionService/GetByNameSessionService";


export class GetByNameSessionController{
    constructor(private sessionRepo: ISessionRepositoy){}
    async handle(req: Request, res: Response): Promise<Response>{
        const { name } = req.params;

        const getByNameSessionService = new GetByNameSessionService(this.sessionRepo)
        const result = await getByNameSessionService.execute({ name })

        return res.status(200).json(result)
    }
}