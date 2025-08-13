import { Request, Response } from "express";
import { ISessionRepositoy } from "../../../interfaces.ts/ISessionRepository";
import { CreateSessionService } from "../../../services/SessionService/CreateSessionService";


export class CreateSessionController{
    constructor(private sessionRepo: ISessionRepositoy){}
    async handle(req: Request, res: Response): Promise<Response>{
        const { name, animalListId, userId} = req.body;

        const createSessionService = new CreateSessionService(this.sessionRepo)
        const result  = await createSessionService.execute({ name, animalListId, userId})

        return res.status(201).json(result);
    }
}