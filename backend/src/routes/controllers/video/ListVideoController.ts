import { Request, Response } from "express";
import { IVideoRepository } from "../../../interfaces.ts/IVideoRepository";
import { ListVideoService } from "../../../services/VideoService/ListVideoService";

export class ListVideoController{
    constructor(private videoRepo: IVideoRepository){}
    async handle(req: Request, res: Response): Promise<Response>{
        const {sessionId, flag} = req.params;

        const listVideoService = new ListVideoService(this.videoRepo)
        const result = await listVideoService.execute({sessionId, flag})

        return res.json(result)
    }
}