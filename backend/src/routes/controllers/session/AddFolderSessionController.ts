import { Request, Response } from "express";
import { ISessionRepositoy } from "../../../interfaces.ts/ISessionRepository";
import { AddFolderSessionService } from "../../../services/SessionService/AddFolderSessionService";


export class AddFolderSessionController{
    constructor(private sessionRepo: ISessionRepositoy){}
    async handle(req: Request, res: Response): Promise<Response>{
        const { id } = req.params;
        const { folder } = req.body;

        const addFolderSessionService = new AddFolderSessionService(this.sessionRepo)
        await addFolderSessionService.execute({id, folder})

        return res.status(201).json()

    }
}