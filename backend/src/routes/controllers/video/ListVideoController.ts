import { Request, Response } from "express";
import { IVideoRepository } from "../../../interfaces.ts/IVideoRepository";
import { ListVideoService } from "../../../services/VideoService/ListVideoService";

export class ListVideoController{
    constructor(private videoRepo: IVideoRepository){}
    async handle(req: Request, res: Response): Promise<Response>{
        const {sessionId} = req.params;

        const listVideoService = new ListVideoService(this.videoRepo)
        const result = await listVideoService.execute({sessionId})

        return res.json(result)
    }
}