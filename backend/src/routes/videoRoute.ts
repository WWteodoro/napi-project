import { Request, Response, Router } from "express";
import { VideoRepository } from "../repositories/VideoRepository";
import { ListVideoController } from "./controllers/video/ListVideoController";
import { ListVideoWithAnimalController } from "./controllers/video/ListVideoWithAnimalController";
import { ListVideoWithoutAnimalController } from "./controllers/video/ListVideoWithoutAnimalController";
import { resolveController } from "../adapters/resolverController";

export const videoRoute = Router();

const videoRepo = new VideoRepository();
const listVideoController = new ListVideoController(videoRepo);
const listVideoWithAnimalController = new ListVideoWithAnimalController(videoRepo);
const listVideoWithoutAnimalController = new ListVideoWithoutAnimalController(videoRepo);

videoRoute.get('/:sessionId', resolveController(async (req: Request, res:Response) => {
    return await listVideoController.handle(req, res)
}))

videoRoute.get('/true/:sessionId', resolveController(async (req: Request, res:Response) => {
    return await listVideoWithAnimalController.handle(req, res)
}))

videoRoute.get('/false/:sessionId', resolveController(async (req: Request, res:Response) => {
    return await listVideoWithoutAnimalController.handle(req, res)
}))