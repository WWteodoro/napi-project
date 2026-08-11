import { Request, Response } from "express";
import { IAnimalRepository } from "../../../interfaces.ts/IAnimalRepository";
import { DeleteAnimalService } from "../../../services/AnimalService/DeleteAnimalService";

export class DeleteAnimalController {
    constructor(private animalRepo: IAnimalRepository){}
    async handle(req:Request, res: Response): Promise<Response>{
        const { id } = req.params;

        const deleteAnimalService = new DeleteAnimalService(this.animalRepo)
        await deleteAnimalService.execute({ id })

        return res.status(200).send()
    }
}