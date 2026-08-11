import { Request, Response } from "express";
import { INoteRepository } from "../../../interfaces.ts/INoteRepository";
import { GetNoteService } from "../../../services/NoteService/GetNoteService";

export class GetNoteController {
    constructor(private noteRepo: INoteRepository){}
    async handle(req: Request, res: Response): Promise<Response>{
        const { id } = req.params;

        const getNoteService = new GetNoteService(this.noteRepo)
        const result = await getNoteService.execute({id})

        return res.json(result)
    }
}