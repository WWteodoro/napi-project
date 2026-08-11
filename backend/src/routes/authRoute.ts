import { Router, Request, Response } from "express";
import { resolveController } from "../adapters/resolverController";
import { ICryptoRepository } from "../interfaces.ts/ICryptoRepository";
import { IHashRepository } from "../interfaces.ts/IHashRepository";
import { IJWTRepository } from "../interfaces.ts/IJWTRepository";
import { IUserRepository } from "../interfaces.ts/IUserRepository";
import { HashRepository } from "../repositories/HashRepository";
import { UserRepository } from "../repositories/UserRepository";
import { AuthenticateUserController } from "./controllers/user/AuthenticateUserController";
import { CryptoRepository } from "../repositories/CryptoRepository";
import { JWTRepository } from "../repositories/JWTRepository";

export const userAuthenticateRoute = Router();

const cryptoRepo: ICryptoRepository = new CryptoRepository()
const userRepo: IUserRepository = new UserRepository();
const jwtRepo: IJWTRepository = new JWTRepository();
const hashRepo: IHashRepository = new HashRepository();
const authenticateUserController = new AuthenticateUserController(userRepo, jwtRepo, hashRepo);

userAuthenticateRoute.post("/", resolveController(async (req: Request, res: Response) => {
    return await authenticateUserController.handle(req, res);
}))