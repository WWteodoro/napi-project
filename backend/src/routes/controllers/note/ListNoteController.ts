import { Request, Response } from "express";
import { INoteRepository } from "../../../interfaces.ts/INoteRepository";
import { ListNoteService } from "../../../services/NoteService/ListNoteService";

export class ListNoteController{
    constructor(private noteRepo: INoteRepository){}
    async handle(req: Request, res: Response): Promise<Response>{
        const listNoteService = new ListNoteService(this.noteRepo)
        const notes = await listNoteService.execute()

        return res.json(notes)
    }
}