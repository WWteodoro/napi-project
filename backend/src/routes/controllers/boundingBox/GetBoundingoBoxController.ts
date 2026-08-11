import { Request, Response } from "express";
import { IBoundingBoxRepository } from "../../../interfaces.ts/IBoundingBoxRepository";
import { GetBoundingBoxService } from "../../../services/BoundingBoxService/GetBoundingBoxService";


export class GetBoundingBoxController{
     constructor(private boxRepo: IBoundingBoxRepository){}
     async handle(req: Request, res: Response): Promise<Response>{
       const { id } = req.params;

       const getBoundingBoxService = new GetBoundingBoxService(this.boxRepo)
       const result = await getBoundingBoxService.execute({ id })

       return res.json(result)
     }
}