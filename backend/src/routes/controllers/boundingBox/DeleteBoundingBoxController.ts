import { Request, Response } from "express";
import { IBoundingBoxRepository } from "../../../interfaces.ts/IBoundingBoxRepository";
import { DeleteBoundingBoxService } from "../../../services/BoundingBoxService/DeleteBoundingBoxService";

export class DeleteBoundingBoxController{
    constructor(private boxRepo: IBoundingBoxRepository){}
    async handle(req: Request, res: Response): Promise<Response>{
        const { id } = req.params;

        const deleteBoundingBoxService = new DeleteBoundingBoxService(this.boxRepo)
        await deleteBoundingBoxService.execute({ id })

        return res.status(200).send()
    }
    }
