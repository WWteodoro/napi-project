import { AppError } from "../errors/AppError";
import { IUser } from "../interfaces.ts/IUserInterface";
import { IUserRepository } from "../interfaces.ts/IUserRepository";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export class UserRepository implements IUserRepository{
    constructor(
      ) {}
    async findAll(): Promise<IUser[]> {
        const result = await prisma.user.findMany()
        return result
    }

    async insert(props: IUser): Promise<IUser> {
        const result = await prisma.user.create({
            data: {id: props.id,name: props.name, password: props.password}
        })
        
        return result;

    }

    async findOneUser(id: string): Promise<IUser>{
        const result = await prisma.user.findUnique({
            where: { id }
        })

        if(!result) throw new AppError('User not found')
        return result
    }

    async update(props: IUser, id: string): Promise<IUser> {
        const result = await prisma.user.update({
            where: { id },
            data: {id: props.id,name: props.name, password: props.password},
        })

        return result;
    };

    async delete(id: string): Promise<void>{
        await prisma.user.delete({
            where: { id }
        })
    }

    async findUserByName(Name: string): Promise<IUser> {
        const result = await prisma.user.findUnique({
          where: { name: Name }
        });
        if(!result) throw new Error('User not found')
        
        return result;
      }
    
}

    