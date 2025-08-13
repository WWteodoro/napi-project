import { User } from "../../entities/user"
import { IUserUpdateRequest } from "../../interfaces.ts/IUserInterface"
import { IUserRepository } from "../../interfaces.ts/IUserRepository"

export class UpdateUserService{
    constructor(private userRepo: IUserRepository){}
    async execute({ id, name, password }: IUserUpdateRequest): Promise<void>{
        const result = await this.userRepo.findOneUser(id)
    
        const user = new User({
            name: name || result.name,
            password: password || result.password,
            
        }, result.id)
        
        await this.userRepo.update(user.toJson(), id)
    
    }
}