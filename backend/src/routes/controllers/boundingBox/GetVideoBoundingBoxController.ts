import { Request, Response } from "express";
import { IBoundingBoxRepository } from "../../../interfaces.ts/IBoundingBoxRepository";
import { GetVideoBoundingBoxService } from "../../../services/BoundingBoxService/GetVideoBoundingBoxService";


export class GetVideoBoundingBoxController{
     constructor(private boxRepo: IBoundingBoxRepository){}
     async handle(req: Request, res: Response): Promise<Response>{
      const { id } = req.params;

      const getVideoBoundingBox = new GetVideoBoundingBoxService(this.boxRepo)
      const result = await getVideoBoundingBox.execute({ id } )

      return res.status(200).json(result)


     }
}