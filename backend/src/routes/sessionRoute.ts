import { Request, Response, Router } from "express";
import { SessionRepository } from "../repositories/SessionRepository";
import { CreateSessionController } from "./controllers/session/CreateSessionController";
import { AddFolderSessionController } from "./controllers/session/AddFolderSessionController";
import { GetByNameSessionController } from "./controllers/session/GetByNameSessionController";
import { GetByUserSessionController } from "./controllers/session/GetByUserSessionController";
import { GetSessionController } from "./controllers/session/GetSessionController";
import { ListSessionController } from "./controllers/session/ListSessionController";
import { UpdateSessionController } from "./controllers/session/UpdateSessionController";
import { resolveController } from "../adapters/resolverController";
import { DeleteSessionController } from "./controllers/session/DeleteSessionController";
import { GetByPlaceSessionController } from "./controllers/session/GetByPlaceSessionController";

export const sessionRoute = Router();

const sessionRepo = new SessionRepository();
const createSessionController = new CreateSessionController(sessionRepo)
const addFolderSessionController = new AddFolderSessionController(sessionRepo)
const getByNameSessioController = new GetByNameSessionController(sessionRepo)
const getByUserSessionController = new GetByUserSessionController(sessionRepo)
const getSessionController = new GetSessionController(sessionRepo)
const listSessionController = new ListSessionController(sessionRepo)
const updateSessionController = new UpdateSessionController(sessionRepo)
const deleteSessionController = new DeleteSessionController(sessionRepo)
const getByPlaceSessionController = new GetByPlaceSessionController(sessionRepo)

sessionRoute.post('/:id', resolveController(async (req: Request, res: Response) => {
    return await addFolderSessionController.handle(req,res)
}))

sessionRoute.post('/', resolveController(async (req: Request, res: Response) => {
    return await createSessionController.handle(req,res)
}))

sessionRoute.get('/name/:name', resolveController(async (req: Request, res: Response) => {
    return await getByNameSessioController.handle(req,res)
}))

sessionRoute.get('/user/:user', resolveController(async (req: Request, res: Response) => {
    return await getByUserSessionController.handle(req,res)
}))

sessionRoute.get('/:id', resolveController(async (req: Request, res: Response) => {
    return await getSessionController.handle(req,res)
}))

sessionRoute.get('/', resolveController(async (req: Request, res: Response) => {
    return await listSessionController.handle(req,res)
}))

sessionRoute.put('/:id', resolveController(async (req: Request, res: Response) => {
    return await updateSessionController.handle(req,res)
}))

sessionRoute.delete('/:id', resolveController(async (req: Request, res: Response) => {
    return await deleteSessionController.handle(req,res)
}))

sessionRoute.get('/place/:placeId', resolveController(async (req: Request, res: Response) => {
    return await getByPlaceSessionController.handle(req,res)
}))
