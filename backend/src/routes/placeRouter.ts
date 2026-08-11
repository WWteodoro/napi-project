import { Request, Response, Router } from "express"
import { PlaceRepository } from "../repositories/PlaceRepository";
import { CreatePlaceController } from "./controllers/place/CreatePlaceController";
import { DeletePlaceController } from "./controllers/place/DeletePlaceController";
import { FindAllPlacesController } from "./controllers/place/FindAllPlacesController";
import { FindByNamePlaceController } from "./controllers/place/FindByNamePlaceController";
import { FindOnePlaceController } from "./controllers/place/FindOnePlaceController";
import { UpdatePlaceController } from "./controllers/place/UpdateControllerService";
import { resolveController } from "../adapters/resolverController";

export const placeRoute = Router();

const placeRepo = new PlaceRepository();
const createPlaceController = new CreatePlaceController(placeRepo)
const deletePlaceController = new DeletePlaceController(placeRepo)
const listPlaceController = new FindAllPlacesController(placeRepo)
const getByNamePlaceController = new FindByNamePlaceController(placeRepo)
const getPlaceController = new FindOnePlaceController(placeRepo)
const updatePlaceController = new UpdatePlaceController(placeRepo)

placeRoute.post('/', resolveController(async (req: Request, res: Response) => {
    return await createPlaceController.handle(req, res)
}))

placeRoute.delete('/:id', resolveController(async (req: Request, res: Response) => {
    return await deletePlaceController.handle(req, res)
}))

placeRoute.get('/', resolveController(async (req: Request, res: Response) => {
    return await listPlaceController.handle(req, res)
}))

placeRoute.get('/name/:name', resolveController(async (req: Request, res: Response) => {
    return await getByNamePlaceController.handle(req, res)
}))

placeRoute.get('/:id', resolveController(async (req: Request, res: Response) => {
    return await getPlaceController.handle(req, res)
}))

placeRoute.put('/:id', resolveController(async (req: Request, res: Response) => {
    return await updatePlaceController.handle(req, res)
}))