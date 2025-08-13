import { Request, Response } from "express";
import { IBoundingBoxRepository } from "../../../interfaces.ts/IBoundingBoxRepository";
import { UpdateBoundingBoxService } from "../../../services/BoundingBoxService/UpdateBoudingBoxService";


export class UpdateBoundingBoxController{
     constructor(private boxRepo: IBoundingBoxRepository){}
     async handle(req: Request, res: Response): Promise<Response>{
      const { id } = req.params;
      const { x0, x1, y0, y1} = req.body;

      const updateBoundingBoxService = new UpdateBoundingBoxService(this.boxRepo)
      const result = await updateBoundingBoxService.execute({id, x0,x1,y0,y1})

      return res.status(201).json(result)
     }
}