import { Request, Response } from "express";
import { IPlaceRepository } from "../../../interfaces.ts/IPlaceRepository";
import { CreatePlaceService } from "../../../services/PlaceService/CreatePlaceService";

export class CreatePlaceController{
    constructor(private placeRepo: IPlaceRepository){}
    async handle(req: Request, res: Response): Promise<Response>{
        const { name } = req.body;

        const createPlaceService = new CreatePlaceService(this.placeRepo)
        const result = await createPlaceService.execute({name})

        return res.status(201).json(result)
    }
}