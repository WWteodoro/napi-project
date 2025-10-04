import { Request, Response } from "express";
import { INoteRepository } from "../../../interfaces.ts/INoteRepository";
import { ExportFullyCSVService } from "../../../services/NoteService/ExportFullyCSVService";

export class ExportFullyCSVController {
    constructor(private noteRepo: INoteRepository){}
    async handle(_: Request, res: Response): Promise<Response>{
        const exportFullyCSVService = new ExportFullyCSVService(this.noteRepo)
        const path = await exportFullyCSVService.execute()
        return res.json(path)
    }
}