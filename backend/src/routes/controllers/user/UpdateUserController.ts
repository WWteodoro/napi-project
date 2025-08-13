import { Request, Response } from "express";
import { UpdateUserService } from "../../../services/UserService/UpdateUserService";
import { IUserRepository } from "../../../interfaces.ts/IUserRepository";


export class UpdateUserController {
    constructor(private userRepo: IUserRepository){}
    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const{ name, password} = req.body;
    
       const updateUserService = new UpdateUserService(this.userRepo)
       await updateUserService.execute({ id, name,  password})
    
        return res.status(201).json()}
}

