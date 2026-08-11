import { Request, Response } from "express";
import { IPlaceRepository } from "../../../interfaces.ts/IPlaceRepository";
import { ListPlacesService } from "../../../services/PlaceService/FindAllPlacesService";

export class FindAllPlacesController{
    constructor(private placeRepo: IPlaceRepository){}
    async handle(req: Request, res: Response): Promise<Response>{
        const list = new ListPlacesService(this.placeRepo)
        const places = await list.execute()
        return res.json(places)
    }
}