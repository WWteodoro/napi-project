import { Request, Response} from "express";
import { IUserRepository } from "../../../interfaces.ts/IUserRepository";
import { GetUserByNameService } from "../../../services/UserService/GetUserByNameService";


export class GetUserByNameController{
    constructor(private userRepo: IUserRepository){}
    async handle(req: Request, res: Response):Promise<Response>{
        const { name } = req.params;

        const getUserByNameService = new GetUserByNameService(this.userRepo)
        const result = await getUserByNameService.execute({ name })

        return res.status(200).json(result)
    }
}