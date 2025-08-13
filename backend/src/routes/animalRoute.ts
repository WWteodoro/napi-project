import { Request, Response, Router } from "express";
import { resolveController } from "../adapters/resolverController";
import { AnimalRepository } from "../repositories/AnimalRepository";
import { CreateAnimalController } from "./controllers/animal/CreateAnimalController";
import { DeleteAnimalController } from "./controllers/animal/DeleteAnimalController";
import { GetAnimalByNameController } from "./controllers/animal/GetAnimalByNameController";
import { GetAnimalController } from "./controllers/animal/GetAnimalController";
import { ListAnimalController } from "./controllers/animal/ListAnimalController";
import { UpdateAnimalService } from "../services/AnimalService/UpdateAnimalService";
import { UpdateAnimalController } from "./controllers/animal/UpdateAnimalController";

export const animalRoute = Router();

const animalRepo = new AnimalRepository()
const createAnimalController = new CreateAnimalController(animalRepo)
const deleteAnimalController = new DeleteAnimalController(animalRepo)
const getAnimalByNameController = new GetAnimalByNameController(animalRepo)
const getAnimalController = new GetAnimalController(animalRepo)
const listAnimalController = new ListAnimalController(animalRepo)
const updateAnimalController = new UpdateAnimalController(animalRepo)

animalRoute.post('/', resolveController(async (req: Request, res: Response) => {
    return await createAnimalController.handle(req,res)
}))

animalRoute.delete('/:id', resolveController(async (req: Request, res: Response) => {
    return await deleteAnimalController.handle(req,res)
}))

animalRoute.get('/name/:name', resolveController(async (req: Request, res: Response) => {
    return await getAnimalByNameController.handle(req,res)
}))

animalRoute.get('/:id', resolveController(async (req: Request, res: Response) => {
    return await getAnimalController.handle(req,res)
}))

animalRoute.get('/', resolveController(async (_: Request, res: Response) => {
    return await listAnimalController.handle(_,res)
}))

animalRoute.put('/:id', resolveController(async (req: Request, res: Response) => {
    return await updateAnimalController.handle(req,res)
}))