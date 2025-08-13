import { AppError } from "../../errors/AppError";
import { IHashRepository } from "../../interfaces.ts/IHashRepository";
import { IJWTRepository } from "../../interfaces.ts/IJWTRepository";
import { IUserAuthenticateRequest } from "../../interfaces.ts/IUserInterface";
import { IUserRepository } from "../../interfaces.ts/IUserRepository";

export class AuthenticateUserService {
    constructor(
        private userRepo: IUserRepository, 
        private jwtRepo: IJWTRepository, 
        private hashRepo: IHashRepository
    ) { }
    
    async execute({name, password}: IUserAuthenticateRequest): Promise<Object> {
        const user = await this.userRepo.findUserByName(name);
        if(user) {
            console.log(user.password, "===", password)

            const b =  await this.hashRepo.uncryptographie(password, user.password)
            
            if(b === true) {
                const token = this.jwtRepo.generate({ email: user.name!, id: user.id })
                console.log(token)

                return { user, token }

            } else throw new AppError("Incorrect password");

        } else throw new AppError("This user doesn't exists");
    }
}