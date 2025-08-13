import { Request, Response } from "express";
import { IAnimalListRepository } from "../../../interfaces.ts/IAnimalListRepository";
import { GetAnimalListService } from "../../../services/AnimalListService/GetAnimalListService";

export class GetAnimalListController{
    constructor(private animalListRepo: IAnimalListRepository){}
    async handle(req: Request, res: Response): Promise<Response>{
        const { id } = req.params;

        const getAnimalListService = new GetAnimalListService(this.animalListRepo)
        const result = await getAnimalListService.execute({ id })

        return res.json(result)
    }
}