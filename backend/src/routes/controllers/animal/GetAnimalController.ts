import { Request, Response } from "express";
import { IAnimalRepository } from "../../../interfaces.ts/IAnimalRepository";
import { GetAnimalService } from "../../../services/AnimalService/GetAnimalService";

export class GetAnimalController {
    constructor(private animalRepo: IAnimalRepository){}
    async handle(req:Request, res: Response): Promise<Response>{
        const { id } = req.params;

        const getAnimalService = new GetAnimalService(this.animalRepo)
        const result = await getAnimalService.execute({ id })

        return res.json(result)
    }
}