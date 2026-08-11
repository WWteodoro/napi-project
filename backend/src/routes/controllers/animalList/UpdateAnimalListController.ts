import { Request, Response } from "express";
import { IAnimalListRepository } from "../../../interfaces.ts/IAnimalListRepository";
import { UpdateAnimalListService } from "../../../services/AnimalListService/UpdateAnimalListService";

export class UpdateAnimalListController{
    constructor(private animalListRepo: IAnimalListRepository){}
    async handle(req: Request, res: Response): Promise<Response>{
        const { id } = req.params;
        const { name } = req.body;

        const updateAnimalListService = new UpdateAnimalListService(this.animalListRepo)
        await updateAnimalListService.execute({id, name})

        return res.status(201).json()
    }
}