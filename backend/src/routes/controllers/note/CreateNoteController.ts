import { Request, Response } from "express";
import { INoteRepository } from "../../../interfaces.ts/INoteRepository";
import { CreateNoteService } from "../../../services/NoteService/CreateNoteService";

export class CreateNoteController {
    constructor(private noteRepo: INoteRepository){}
    async handle(req: Request, res: Response): Promise<Response>{
        const {quantity, dateTime, location, content, animal, userId, boundingBoxId} = req.body;

        const createNoteService = new CreateNoteService(this.noteRepo)
        const result = await createNoteService.execute({quantity, dateTime, location, content, animal, userId, boundingBoxId})

        return res.status(201).json(result)
    }
}