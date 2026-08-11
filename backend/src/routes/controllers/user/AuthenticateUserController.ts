import { IHashRepository } from "../../../interfaces.ts/IHashRepository";
import { IJWTRepository } from "../../../interfaces.ts/IJWTRepository";
import { IUserRepository } from "../../../interfaces.ts/IUserRepository";
import { AuthenticateUserService } from "../../../services/UserService/AuthenticateUserService";
import { Request, Response } from "express";

export class AuthenticateUserController {
    constructor(
        private userRepo: IUserRepository, 
        private jwtRepo: IJWTRepository,
        private hashRepo: IHashRepository
    ) { };

    async handle(req: Request, res: Response): Promise<Response> {
        const { name, password } = req.body;
        console.log("1")
        const authenticateUserService = new AuthenticateUserService(this.userRepo, this.jwtRepo, this.hashRepo);
        const result = await authenticateUserService.execute({name, password});

        return res.status(201).json(result)
    }
}