import { Request, Response } from "express";
import { IBoundingBoxRepository } from "../../../interfaces.ts/IBoundingBoxRepository";
import { ListBoundingBoxService } from "../../../services/BoundingBoxService/ListBoundingBoxService";


export class ListBoundingBoxController{
     constructor(private boxRepo: IBoundingBoxRepository){}
     async handle(_: Request, res: Response): Promise<Response>{
      const listBoundingBoxService = new ListBoundingBoxService(this.boxRepo)
      const boxes = await listBoundingBoxService.execute()

      return res.json(boxes)
     }
}