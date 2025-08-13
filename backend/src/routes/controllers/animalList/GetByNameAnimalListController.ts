import { Request, Response } from "express";
import { IAnimalListRepository } from "../../../interfaces.ts/IAnimalListRepository";
import { GetAnimalListService } from "../../../services/AnimalListService/GetAnimalListService";
import { GetByNameAnimalListService } from "../../../services/AnimalListService/GetByNameAnimalListService";

export class GetByNameAnimalListController{
    constructor(private animalListRepo: IAnimalListRepository){}
    async handle(req: Request, res: Response): Promise<Response>{
        const { name } = req.params;

        const getByNameAnimalListService = new GetByNameAnimalListService(this.animalListRepo)
        const result = await getByNameAnimalListService.execute({ name })

        return res.status(200).json(result)
    }
}