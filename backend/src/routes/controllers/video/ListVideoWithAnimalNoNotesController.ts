import { Request, Response } from "express";
import { IVideoRepository } from "../../../interfaces.ts/IVideoRepository";
import { ListVideoService } from "../../../services/VideoService/ListVideoService";
import { ListVideoWithAnimalsService } from "../../../services/VideoService/ListVideoWithAnimalsService";
import { ListVideoWithAnimalsAndNotesService } from "../../../services/VideoService/ListVideoWithAnimalsAndNotesService";
import { ListVideoWithAnimalsNoNotesService } from "../../../services/VideoService/ListVideoWithAnimalsNoNotesService";

export class ListVideoWithAnimalNoNotesController{
    constructor(private videoRepo: IVideoRepository){}
    async handle(req: Request, res: Response): Promise<Response>{
        const {sessionId} = req.params;

        const listVideoService = new ListVideoWithAnimalsNoNotesService(this.videoRepo)
        const result = await listVideoService.execute({sessionId})

        return res.json(result)
    }
}