import { IUser } from "../../interfaces.ts/IUserInterface"
import { IUserRepository } from "../../interfaces.ts/IUserRepository"

export class ListUsersService{
    constructor(private userRepo: IUserRepository){}
    async execute(): Promise<IUser[]>{
        const result = await this.userRepo.findAll()
        return result
    }
}