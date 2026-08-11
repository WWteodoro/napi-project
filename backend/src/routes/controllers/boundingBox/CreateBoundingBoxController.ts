import { Request, Response } from "express";
import { IBoundingBoxRepository } from "../../../interfaces.ts/IBoundingBoxRepository";
import { CreateBoundingBoxService } from "../../../services/BoundingBoxService/CreateBoundingBoxService";

export class CreateBoundingBoxController{
     constructor(private boxRepo: IBoundingBoxRepository){}
     async handle(req: Request, res: Response): Promise<Response>{
        const { videoId, time, x0, y0, x1, y1} = req.body;

        const confidence = 0;

        const createBoundingBoxService = new CreateBoundingBoxService(this.boxRepo)

        const result = await createBoundingBoxService.execute({videoId, time, x0, y0, x1, y1, confidence})

        return res.status(201).json(result);
     }
}