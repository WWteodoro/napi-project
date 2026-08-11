import { Request, Response } from "express";
import { IHashRepository } from "../../../interfaces.ts/IHashRepository";
import { IUserRepository } from "../../../interfaces.ts/IUserRepository";
import { CreateUserService } from "../../../services/UserService/CreateUserService";


export class CreateUserController {
    constructor(private userRepo: IUserRepository, private hashRepo: IHashRepository){}
    async handle(req: Request, res: Response): Promise<Response> {
        const { name, password
        } = req.body;

    const createUserService = new CreateUserService(this.userRepo, this.hashRepo)
    const result = await createUserService.execute({ name, password})
    
        return res.status(201).json(result);
    }}

