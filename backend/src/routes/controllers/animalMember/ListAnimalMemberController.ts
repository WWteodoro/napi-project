import { Request, Response } from "express";
import { IAnimalMemberRepository } from "../../../interfaces.ts/IAnimalMemberRepository";
import { ListAnimalMemberService } from "../../../services/AnimalMemberService/ListAnimalMemberService";

export class ListAnimalMemberController{
    constructor(private animalMemberRepo: IAnimalMemberRepository){}
    async handle(req:Request, res: Response): Promise<Response>{
        const { animalListId } = req.params;

        const listAnimalMemberService = new ListAnimalMemberService(this.animalMemberRepo)
        const result = await listAnimalMemberService.execute({animalListId})

        return res.status(200).json(result)
    }
}