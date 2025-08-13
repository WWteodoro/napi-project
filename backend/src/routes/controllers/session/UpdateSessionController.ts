import { Request, Response } from "express";
import { ISessionRepositoy } from "../../../interfaces.ts/ISessionRepository";
import { UpdateSessionService } from "../../../services/SessionService/UpdateSessionService";



export class UpdateSessionController{
    constructor(private sessionRepo: ISessionRepositoy){}
    async handle(req: Request, res: Response): Promise<Response>{
        const { id } = req.params;
        const { name, animalListId} = req.body;

        const updateSessionService = new UpdateSessionService(this.sessionRepo)
        await updateSessionService.execute({ id, name, animalListId})

        return res.status(201).json()
    }
}