import { Request, Response } from "express";
import { IPlaceRepository } from "../../../interfaces.ts/IPlaceRepository";
import { GetPlaceService } from "../../../services/PlaceService/FindOnePlaceService";

export class FindOnePlaceController{
    constructor(private placeRepo: IPlaceRepository){}
    async handle(req: Request, res: Response): Promise<Response>{
        const { id } = req.params;

        const find = new GetPlaceService(this.placeRepo)
        const result = await find.execute({id})

        return res.json(result)
    }
}