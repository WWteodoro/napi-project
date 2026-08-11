import { Request, Response } from "express";
import { IAnimalRepository } from "../../../interfaces.ts/IAnimalRepository";
import { CreateAnimalService } from "../../../services/AnimalService/CreateAnimalService";

export class CreateAnimalController {
    constructor(private animalRepo: IAnimalRepository){}
    async handle(req: Request, res: Response): Promise<Response>{
        const { name } = req.body;

        const createAnimalService = new CreateAnimalService(this.animalRepo)
        await createAnimalService.execute({name})

        return res.status(201).json({ success: true });
    }
}