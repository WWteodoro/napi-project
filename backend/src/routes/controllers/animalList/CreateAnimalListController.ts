import { Request, Response } from "express";
import { IAnimalListRepository } from "../../../interfaces.ts/IAnimalListRepository";
import { CreateAnimalListService } from "../../../services/AnimalListService/CreateAnimalListService";

export class CreateAnimalListController{
    constructor(private animalListRepo: IAnimalListRepository){}
    async handle(req: Request, res: Response): Promise<Response>{
        const { name } = req.body;

        const createAnimalListService = new CreateAnimalListService(this.animalListRepo)
        await createAnimalListService.execute({ name })

        return res.status(201).json({ success: true });
    }
}