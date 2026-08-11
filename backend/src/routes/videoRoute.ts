import { Request, Response, Router } from "express";
import { VideoRepository } from "../repositories/VideoRepository";
import { ListVideoController } from "./controllers/video/ListVideoController";
import { ListVideoWithAnimalController } from "./controllers/video/ListVideoWithAnimalController";
import { ListVideoWithoutAnimalController } from "./controllers/video/ListVideoWithoutAnimalController";
import { resolveController } from "../adapters/resolverController";
import { ListVideoWithAnimalAndNotesController } from "./controllers/video/ListVideoWithAnimalAndNotesController";
import { ListVideoWithAnimalNoNotesController } from "./controllers/video/ListVideoWithAnimalNoNotesController";
import { ExcludeGroupController } from "./controllers/video/ExcludeGroupController";

export const videoRoute = Router();

const videoRepo = new VideoRepository();
const listVideoController = new ListVideoController(videoRepo);
const listVideoWithAnimalController = new ListVideoWithAnimalController(videoRepo);
const listVideoWithoutAnimalController = new ListVideoWithoutAnimalController(videoRepo);
const listVideoWithAnimalAndNotesController = new ListVideoWithAnimalAndNotesController(videoRepo)
const listVideoWithAnimalNoNotesController = new ListVideoWithAnimalNoNotesController(videoRepo)
const excludeGroupController = new ExcludeGroupController(videoRepo)

videoRoute.get('/:sessionId', resolveController(async (req: Request, res:Response) => {
    return await listVideoController.handle(req, res)
}))

videoRoute.get('/true/:sessionId', resolveController(async (req: Request, res:Response) => {
    return await listVideoWithAnimalController.handle(req, res)
}))

videoRoute.get('/false/:sessionId', resolveController(async (req: Request, res:Response) => {
    return await listVideoWithoutAnimalController.handle(req, res)
}))

videoRoute.get('/true-true/:sessionId', resolveController(async (req: Request, res:Response) => {
    return await listVideoWithAnimalAndNotesController.handle(req, res)
}))

videoRoute.get('/true-false/:sessionId', resolveController(async (req: Request, res:Response) => {
    return await listVideoWithAnimalNoNotesController.handle(req, res)
}))

videoRoute.delete('/:sessionId', resolveController(async (req: Request, res:Response) => {
    return await excludeGroupController.handle(req, res)
}))
//criar aqui mais funções pra filtros do tipo com animais e anotados, com animais e não anotados, para facilitar a integração e uso dos filtros