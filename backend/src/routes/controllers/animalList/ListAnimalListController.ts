import { Request, Response } from "express";
import { IAnimalListRepository } from "../../../interfaces.ts/IAnimalListRepository";
import { ListAnimalListService } from "../../../services/AnimalListService/ListAnimalListService";

export class ListAnimalListController{
    constructor(private animalListRepo: IAnimalListRepository){}
    async handle(req: Request, res: Response): Promise<Response>{
        const listAnimalListService = new ListAnimalListService(this.animalListRepo)
        const animalLists = await listAnimalListService.execute()

        return res.json(animalLists)
    }
}