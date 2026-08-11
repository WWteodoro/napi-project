import { Request, Response } from "express";
import { IAnimalRepository } from "../../../interfaces.ts/IAnimalRepository";
import { UpdateAnimalService } from "../../../services/AnimalService/UpdateAnimalService";

export class UpdateAnimalController {
    constructor(private animalRepo: IAnimalRepository){}
    async handle(req:Request, res: Response): Promise<Response>{
        const { id } = req.params;
        const { name } = req.body;
        
        const updateAnimalService = new UpdateAnimalService(this.animalRepo)
        await updateAnimalService.execute({id, name})

        return res.status(201).json({ message: "Lista atualizada com sucesso" })
    }
}