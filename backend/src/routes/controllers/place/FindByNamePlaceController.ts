import { Request, Response } from "express";
import { IPlaceRepository } from "../../../interfaces.ts/IPlaceRepository";
import { FindByNamePlaceService } from "../../../services/PlaceService/FindByNamePlaceService";

export class FindByNamePlaceController{
    constructor(private placeRepo: IPlaceRepository){}
    async handle(req: Request, res: Response): Promise<Response>{
        const {name} = req.params;

        const get = new FindByNamePlaceService(this.placeRepo)
        const result = await get.execute({name})

        return res.json(result)
    }
}