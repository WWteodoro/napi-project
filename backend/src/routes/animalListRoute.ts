import { Request, Response, Router } from "express";
import { AnimalListRepositoty } from "../repositories/AnimalListRepository";

import { CreateAnimalListController } from "./controllers/animalList/CreateAnimalListController";
import { DeleteAnimalListController } from "./controllers/animalList/DeleteAnimalListController";
import { GetByNameAnimalListController } from "./controllers/animalList/GetByNameAnimalListController";
import { ListAnimalListController } from "./controllers/animalList/ListAnimalListController";
import { UpdateAnimalListController } from "./controllers/animalList/UpdateAnimalListController";
import { resolveController } from "../adapters/resolverController";
import { GetAnimalListController } from "./controllers/animalList/GetAnimalListController";

export const animalListRoute = Router()

const animalListRepo = new AnimalListRepositoty()
const createAnimalListController = new CreateAnimalListController(animalListRepo)
const deleteAnimalListController = new DeleteAnimalListController(animalListRepo)
const getAnimalListController = new GetAnimalListController(animalListRepo)
const getByNameAnimalListController = new GetByNameAnimalListController(animalListRepo)
const listAnimalListController = new ListAnimalListController(animalListRepo)
const updateAnimalListController = new UpdateAnimalListController(animalListRepo)

animalListRoute.post('/', resolveController(async (req: Request, res: Response) => {
    return await createAnimalListController.handle(req, res)
})) 

animalListRoute.delete('/:id', resolveController(async (req: Request, res: Response) => {
    return await deleteAnimalListController.handle(req, res)
}))

animalListRoute.get('/:id', resolveController(async (req: Request, res: Response) => {
    return await getAnimalListController.handle(req, res)
}))

animalListRoute.get('/name/:name', resolveController(async (req: Request, res: Response) => {
    return await getByNameAnimalListController.handle(req, res)
}))

animalListRoute.get('/', resolveController(async (req: Request, res: Response) => {
    return await listAnimalListController.handle(req, res)
}))

animalListRoute.put('/:id', resolveController(async (req: Request, res: Response) => {
    return await updateAnimalListController.handle(req, res)
}))