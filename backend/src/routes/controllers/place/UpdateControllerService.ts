import { Request, Response } from "express";
import { IPlaceRepository } from "../../../interfaces.ts/IPlaceRepository";
import { UpdatePlaceService } from "../../../services/PlaceService/UpdatePlaceService";

export class UpdatePlaceController{
    constructor(private placeRepo: IPlaceRepository){}
    async handle(req: Request, res: Response): Promise<Response>{
        const {id} = req.params;
        const { name } = req.body;

        const up = new UpdatePlaceService(this.placeRepo)
        const result = await up.execute({id, name})

        return res.status(201).json(result)
    }
}