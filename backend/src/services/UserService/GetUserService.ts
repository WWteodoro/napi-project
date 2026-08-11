import { IUserGetRequest, IUser } from "../../interfaces.ts/IUserInterface"
import { IUserRepository } from "../../interfaces.ts/IUserRepository"

export class GetUserService{
    constructor(private userRepo: IUserRepository){}
    async execute({ id }: IUserGetRequest): Promise<IUser>{
        const result = await this.userRepo.findOneUser(id)
        return result
    }
}