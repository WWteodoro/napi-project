import { Request, Response } from "express";
import { IPlaceRepository } from "../../../interfaces.ts/IPlaceRepository";
import { DeletePlaceService } from "../../../services/PlaceService/DeletePlaceService";

export class DeletePlaceController{
    constructor(private placeRepo: IPlaceRepository){}
    async handle(req: Request, res: Response): Promise<Response>{
        const { id } = req.params;

        const deletePlaceService = new DeletePlaceService(this.placeRepo)
        await deletePlaceService.execute({id})

        return res.status(200).send()
    }
}