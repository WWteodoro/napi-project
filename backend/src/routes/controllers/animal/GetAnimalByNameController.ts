import { Request, Response } from "express";
import { IAnimalRepository } from "../../../interfaces.ts/IAnimalRepository";
import { GetAnimalByNameService } from "../../../services/AnimalService/GetAnimalByName";

export class GetAnimalByNameController {
    constructor(private animalRepo: IAnimalRepository){}
    async handle(req:Request, res: Response): Promise<Response>{
        const { name } = req.params;

        const getAnimalByNameService = new GetAnimalByNameService(this.animalRepo)
        const result = await getAnimalByNameService.execute({ name })

        return res.status(200).json(result)
    }
}