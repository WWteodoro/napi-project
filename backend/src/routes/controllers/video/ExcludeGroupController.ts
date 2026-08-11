import { Request, Response } from "express";
import { IVideoRepository } from "../../../interfaces.ts/IVideoRepository";
import { ListVideoService } from "../../../services/VideoService/ListVideoService";
import { ListVideoWithoutAnimalService } from "../../../services/VideoService/ListVideoWithoutAnimalsService";
import { ExcludeGroupService } from "../../../services/VideoService/ExcludeGroupService";

export class ExcludeGroupController{
    constructor(private videoRepo: IVideoRepository){}
    async handle(req: Request, res: Response): Promise<Response>{
        const {sessionId} = req.params;

        const listVideoService = new ExcludeGroupService(this.videoRepo)
        await listVideoService.execute({sessionId})

        return res.status(200).send()
    }
}