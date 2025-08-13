import { Request, Response } from "express";
import { IAnimalListRepository } from "../../../interfaces.ts/IAnimalListRepository";
import { DeleteAnimalListService } from "../../../services/AnimalListService/DeleteAnimalListService";

export class DeleteAnimalListController{
    constructor(private animalListRepo: IAnimalListRepository){}
    async handle(req: Request, res: Response): Promise<Response>{
        const { id } = req.params;
        
        const deleteAnimalListService = new DeleteAnimalListService(this.animalListRepo)
        await deleteAnimalListService.execute({ id })
      
        return res.status(200).send()
    }
}