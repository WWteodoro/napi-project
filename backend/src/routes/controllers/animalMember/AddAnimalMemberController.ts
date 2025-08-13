import { Request, Response } from "express";
import { IAnimalMemberRepository } from "../../../interfaces.ts/IAnimalMemberRepository";
import { AddAnimalMemberService } from "../../../services/AnimalMemberService/AddAnimalMemberService";

export class AddAnimalMemberController{
    constructor(private animalMemberRepo: IAnimalMemberRepository){}
    async handle(req:Request, res: Response): Promise<Response>{
        const { animalId, animalListId } = req.params;

        const addAnimalMemberService = new AddAnimalMemberService(this.animalMemberRepo)
        const result = await addAnimalMemberService.execute({animalId, animalListId})

        return res.status(200).json(result)
    }
}