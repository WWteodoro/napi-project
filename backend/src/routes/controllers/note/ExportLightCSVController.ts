import { Request, Response } from "express";
import { INoteRepository } from "../../../interfaces.ts/INoteRepository";
import { ExportLightCSVService } from "../../../services/NoteService/ExportLightCSVService";

export class ExportLightCSVController{
    constructor(private noteRepo: INoteRepository){}
    async handle(req: Request, res: Response): Promise<Response>{
        const {sessionId} = req.params;

        const exportLightCSVService = new ExportLightCSVService(this.noteRepo)
        const result = await exportLightCSVService.execute({sessionId})

        return res.json(result)
    }
}