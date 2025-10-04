import { Request, Response } from "express";
import { ISessionRepositoy } from "../../../interfaces.ts/ISessionRepository";
import { DeleteSessionService } from "../../../services/SessionService/DeleteSessionService";

export class DeleteSessionController{
    constructor(private sessionRepo: ISessionRepositoy){}
    async handle(req:Request, res: Response): Promise<Response>{
        const { id } = req.params;

        const deleteSessionService = new DeleteSessionService(this.sessionRepo)
        await deleteSessionService.execute({ id })

        return res.status(200).send()
    }
}