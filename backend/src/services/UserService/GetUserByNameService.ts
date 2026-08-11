import { AppError } from "../../errors/AppError";
import { IUserGetByNameRequest, IUser } from "../../interfaces.ts/IUserInterface";
import { IUserRepository } from "../../interfaces.ts/IUserRepository";

export class GetUserByNameService{
    constructor(private userRepo: IUserRepository){}
    async execute({name}: IUserGetByNameRequest): Promise<IUser>{
        const result = await this.userRepo.findUserByName(name)
        if(!result) throw new AppError("User not found");
        return result;
    }
}