import { Request, Response, Router } from "express";
import { AnimalMemberRepository } from "../repositories/AnimalMemberRepository";
import { AddAnimalMemberController } from "./controllers/animalMember/AddAnimalMemberController";
import { RemoveAnimalMemberController } from "./controllers/animalMember/RemoveAnimalMemberController";
import { ListAnimalMemberController } from "./controllers/animalMember/ListAnimalMemberController";
import { resolveController } from "../adapters/resolverController";

export const animalMemberRoute = Router()

const AnimalMemberRepo = new AnimalMemberRepository()
const addAnimal = new AddAnimalMemberController(AnimalMemberRepo)
const removeAnimal = new RemoveAnimalMemberController(AnimalMemberRepo)
const listAnimal = new ListAnimalMemberController(AnimalMemberRepo)

animalMemberRoute.post('/animal/:animalId/list/:animalListId', resolveController(async (req: Request, res: Response) => {
    return await addAnimal.handle(req, res)
}))

animalMemberRoute.delete('/:id/list/:animalListId', resolveController(async (req: Request, res: Response) => {
    return await removeAnimal.handle(req, res)
}))

animalMemberRoute.get('/list/:animalListId', resolveController(async (req: Request, res: Response) => {
    return await listAnimal.handle(req, res)
}))