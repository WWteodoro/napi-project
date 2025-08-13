import { Request, Response } from "express";
import { IAnimalMemberRepository } from "../../../interfaces.ts/IAnimalMemberRepository";
import { RemoveAnimalMemberService } from "../../../services/AnimalMemberService/RemoveAnimalMemberService";

export class RemoveAnimalMemberController{
    constructor(private animalMemberRepo: IAnimalMemberRepository){}
    async handle(req:Request, res: Response): Promise<Response>{
        const { id, animalListId } = req.params;

        const removeAnimalMemberService = new RemoveAnimalMemberService(this.animalMemberRepo)
        const result = await removeAnimalMemberService.execute({id, animalListId})

        return res.status(200).send()
    }
}