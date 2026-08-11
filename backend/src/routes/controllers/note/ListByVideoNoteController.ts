import { Request, Response } from "express";
import { INoteRepository } from "../../../interfaces.ts/INoteRepository";
import { ListByVideoNoteService } from "../../../services/NoteService/ListByVideoNoteService";

export class ListByVideoNoteController{
    constructor(private noteRepo: INoteRepository){}
    async handle(req: Request, res: Response): Promise<Response>{
        const { videoId } = req.params;

        const listByVideoNoteService = new ListByVideoNoteService(this.noteRepo)
        const result = await listByVideoNoteService.execute({ videoId})

        return res.json(result)
    }
}