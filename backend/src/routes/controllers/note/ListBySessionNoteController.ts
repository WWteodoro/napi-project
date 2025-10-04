import { Request, Response } from "express";
import { INoteRepository } from "../../../interfaces.ts/INoteRepository";
import { ListBySessionNoteService } from "../../../services/NoteService/ListBySessionNoteService";

export class ListBySessionNoteController{
    constructor(private noteRepo: INoteRepository){}
    async handle(req: Request, res: Response): Promise<Response>{
        const { sessionId } = req.params;

        const listBySessionNoteService = new ListBySessionNoteService(this.noteRepo)
        const result = await listBySessionNoteService.execute({ sessionId })

        return res.json(result)
    }
}