import { Request, Response } from "express";
import { INoteRepository } from "../../../interfaces.ts/INoteRepository";
import { UpdateNoteService } from "../../../services/NoteService/UpdateNoteService";

export class UpdateNoteController{
    constructor(private noteRepo: INoteRepository){}
    async handle(req: Request, res: Response): Promise<Response>{
        const { id } = req.params;
        const {quantity, dateTime, location, content, animal, userId, boundingBoxId} = req.params;

        const quantity2 = Number(quantity);

        if (isNaN(quantity2)) {
            return res.status(400).json({ error: "Parâmetro 'quantity' inválido." });
        }
        
        const updateNoteService = new UpdateNoteService(this.noteRepo)
        const result = await updateNoteService.execute({id, quantity: quantity2, dateTime, location, content, animal, userId, boundingBoxId})

        return res.status(201).json()

    }
}