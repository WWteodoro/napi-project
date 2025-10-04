import { Request, Response } from "express";
import { INoteRepository } from "../../../interfaces.ts/INoteRepository";
import { GetNoteByBoxService } from "../../../services/NoteService/GetNoteByBoxService";

export class GetNoteByBoxController{
    constructor(private noteRepo: INoteRepository){}
    async handle(req: Request, res: Response): Promise<Response>{
        const {boundingBoxId} = req.params;

        const getNoteByBoxService = new GetNoteByBoxService(this.noteRepo)
        const result = await getNoteByBoxService.execute({boundingBoxId})

        return res.json(result)
    }
}