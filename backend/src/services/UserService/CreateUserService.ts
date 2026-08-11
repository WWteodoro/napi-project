import { User } from "../../entities/user";
import { IHashRepository } from "../../interfaces.ts/IHashRepository";
import { IUserCreateRequest, IUser } from "../../interfaces.ts/IUserInterface";
import { IUserRepository } from "../../interfaces.ts/IUserRepository";

export class CreateUserService{
    constructor(private userRepo: IUserRepository, private hashRepo: IHashRepository){}
    async execute({ name, password}: IUserCreateRequest): Promise<IUser>{
        
        password = await this.hashRepo.cryptographie(password);
        
        const user = new User({name , password})
        
        const result = await this.userRepo.insert(user.toJson())

        return result
               
    }
}