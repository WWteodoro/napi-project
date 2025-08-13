import { AppError } from "../errors/AppError";
import { PrismaClient } from "@prisma/client";
import { IAnimalListRepository } from "../interfaces.ts/IAnimalListRepository";
import { IAnimalList, IAnimalListUpdateRequest } from "../interfaces.ts/IAnimalListInterface";

const prisma = new PrismaClient();
    export class AnimalListRepositoty implements IAnimalListRepository{
        constructor(){}
        async findAll(): Promise<IAnimalList[]> {
          const result = await prisma.animalList.findMany()
          return result  
        }
        
        async findOne(id: string): Promise<IAnimalList> {
            const result = await prisma.animalList.findUnique({
                where: { id }
            })

            if(!result) throw new AppError("AnimalList not found")

                return result
        }
        
        async findByName(name: string): Promise<IAnimalList[]> {
            const result = await prisma.animalList.findMany({
                where: { name }
            })

            return result

        }
        
        async create(props: IAnimalList): Promise<IAnimalList> {
            const result = await prisma.animalList.create({
                data: {id: props.id, name: props.name}
            })

            return result;
        }
        
        async update(props: IAnimalListUpdateRequest, id: string): Promise<IAnimalList> {
            
            const result = await prisma.animalList.update({
                where: { id },
                data: {id: props.id, name: props.name}
            })

            return result
        }
        
        async delete(id: string): Promise<void> {
            const result = await prisma.animalList.findUnique({
                where: { id }
            })

            if(!result) throw new AppError("AnimalList not found")

            await prisma.animalList.delete({
                where: { id }
            })
        }
    }