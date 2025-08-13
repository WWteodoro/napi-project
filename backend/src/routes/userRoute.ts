import { Request, Response, Router } from "express";
import { resolveController } from "../adapters/resolverController";
import { IUser } from "../interfaces.ts/IUserInterface";
import { HashRepository } from "../repositories/HashRepository";
import { UserRepository } from "../repositories/UserRepository";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { DeleteUserController } from "./controllers/user/DeleteUserController";
import { GetUserController } from "./controllers/user/GetUserController";
import { ListUsersController } from "./controllers/user/ListUserController";
import { UpdateUserController } from "./controllers/user/UpdateUserController";
import { GetUserByNameController } from "./controllers/user/GetUserByNameController";


export const userRoute = Router();


const userRepo = new UserRepository();
const hashRepo = new HashRepository()
const createUserController = new CreateUserController(userRepo, hashRepo)
const getUserController = new GetUserController(userRepo)
const listUsersController = new ListUsersController(userRepo)
const updateUserController = new UpdateUserController(userRepo)
const deleteUserController = new DeleteUserController(userRepo)
const getByNameUsersController = new GetUserByNameController(userRepo)

userRoute.post('/', resolveController(async (req: Request, res: Response) => {
    return await createUserController.handle(req, res)
}))


userRoute.get('/:id', resolveController(async (req: Request, res:Response) => {
    return await getUserController.handle(req, res)
}))


userRoute.get('/', resolveController(async (_: Request, res: Response) => {
    return await listUsersController.handle(_,res)
}))


userRoute.put('/:id', resolveController(async (req: Request, res: Response) => {
    return await updateUserController.handle(req,res)
}))


userRoute.delete('/:id', resolveController(async (req: Request, res: Response) => {
    return await deleteUserController.handle(req,res)
}))

userRoute.get('/name/:name', resolveController(async (req: Request, res: Response) => {
    return await getByNameUsersController.handle(req,res)
}))
