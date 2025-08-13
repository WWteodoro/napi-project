import { AppError } from "../errors/AppError";
import { PrismaClient } from "@prisma/client";
import { IAnimalRepository } from "../interfaces.ts/IAnimalRepository";
import { IAnimal } from "../interfaces.ts/IAnimalInterface";

const prisma = new PrismaClient();
export class AnimalRepository implements IAnimalRepository{
    constructor(){}
    async findAll(): Promise<IAnimal[]> {
       const result = await prisma.animal.findMany()
       return result
    }

    async create(props: IAnimal): Promise<IAnimal> {
        const result = await prisma.animal.create({
            data: {id: props.id, name: props.name}
        })

        return result;
    }

    async findOneAnimal(id: string): Promise<IAnimal> {
        const result = await prisma.animal.findUnique({
            where: { id }
        })

        if(!result) throw new AppError("Animal Not Found")

            return result
    }

    async findAnimalByName(name: string): Promise<IAnimal> {
        const result = await prisma.animal.findFirst({
            where: {name: name}
        })
        if(!result) throw new Error('Animal Not Found')

            return result
    }

    async delete(id: string): Promise<void> {
        await prisma.animal.delete({
            where: { id }
        })
    }

    async update(id: string, name: string): Promise<IAnimal> {
        
        const result = await prisma.animal.update({
            where: { id },
            data: {id: id, name: name}
        })

        return result;
    }

}