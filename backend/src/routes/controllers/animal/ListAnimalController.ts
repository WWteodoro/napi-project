import { Request, Response } from "express";
import { IAnimalRepository } from "../../../interfaces.ts/IAnimalRepository";
import { ListAnimalService } from "../../../services/AnimalService/ListAnimalService";

export class ListAnimalController {
    constructor(private animalRepo: IAnimalRepository){}
    async handle(_:Request, res: Response): Promise<Response>{
        const listAnimalService = new ListAnimalService(this.animalRepo)
        const animals = await listAnimalService.execute()
        return res.json(animals)
    }
}