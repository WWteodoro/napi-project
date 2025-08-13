import { Request, Response, Router } from "express";
import { resolveController } from "../adapters/resolverController";
import { BoundingBoxRepository } from "../repositories/BoundingBoxRepository";
import { CreateBoundingBoxController } from "./controllers/boundingBox/CreateBoundingBoxController";
import { DeleteBoundingBoxController } from "./controllers/boundingBox/DeleteBoundingBoxController";
import { GetBoundingBoxController } from "./controllers/boundingBox/GetBoundingoBoxController";
import { GetVideoBoundingBoxController } from "./controllers/boundingBox/GetVideoBoundingBoxController";
import { ListBoundingBoxController } from "./controllers/boundingBox/ListBoundingBoxService";
import { UpdateBoundingBoxController } from "./controllers/boundingBox/UpdateBoundingBoxService";

export const boxRoute = Router();

const boxRepo = new BoundingBoxRepository();
const createBoundingBoxController = new CreateBoundingBoxController(boxRepo)
const deleteBoundingBoxController = new DeleteBoundingBoxController(boxRepo)
const getBoundingBoxController = new GetBoundingBoxController(boxRepo)
const getVideoBoundingBoxController = new GetVideoBoundingBoxController(boxRepo)
const listBoundingBoxController = new ListBoundingBoxController(boxRepo)
const updateBoundingBoxController = new UpdateBoundingBoxController(boxRepo)

boxRoute.post('/', resolveController(async (req: Request, res: Response) => {
    return await createBoundingBoxController.handle(req, res)
}))

boxRoute.delete('/:id', resolveController(async (req: Request, res: Response) => {
    return await deleteBoundingBoxController.handle(req,res)
}))

boxRoute.get('/', resolveController(async (_: Request, res: Response) => {
    return await listBoundingBoxController.handle(_,res)
}))

boxRoute.get('/:id', resolveController(async (req: Request, res:Response) => {
    return await getBoundingBoxController.handle(req, res)
}))

boxRoute.get('/video/:id', resolveController(async (req: Request, res: Response) => {
    return await getVideoBoundingBoxController.handle(req,res)
}))

boxRoute.put('/:id', resolveController(async (req: Request, res: Response) => {
    return await updateBoundingBoxController.handle(req,res)
}))