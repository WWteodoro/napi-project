import { AppError } from "../errors/AppError";
import { PrismaClient } from "@prisma/client";
import { IAnimalMember } from "../interfaces.ts/IAnimalMemberInterface";
import { IAnimalMemberRepository } from "../interfaces.ts/IAnimalMemberRepository";
import { createUUID } from "../utils/createUUID";


const prisma = new PrismaClient();

export class AnimalMemberRepository implements IAnimalMemberRepository{
    constructor(){}
    async findAll(): Promise<IAnimalMember[]> {
        const result = await prisma.animalMember.findMany()
        return result
    }

    async add(animalId: string, animalListId: string): Promise<IAnimalMember> {
        const t1 = await prisma.animal.findUnique({
            where: {id: animalId}
        })

        const t2 = await prisma.animalList.findUnique({
            where: {id: animalListId}
        })


        if(!t1 || !t2) throw new AppError("Something not found")

        const result = await prisma.animalMember.create({
            data: {id: createUUID(), animalListId: animalListId, animalId: animalId, createdAt: new Date()}
        })

        return result
    }

    async remove(id: string, animalListId: string): Promise<void> {
        const data = await prisma.animalMember.findFirst({
            where: { animalId: id, animalListId: animalListId }
        })
        console.log(data)
        if(!data) throw new AppError("This animal isnt in this session")
        
        await prisma.animalMember.delete({
            where: ({id: data.id})
        })

    }

    /*async list(sessionId: string): Promise<any[]> {
        const q = await prisma.animalMember.count({
            where: {sessionId: sessionId}
        })

        let cont = 0;

        const array = await prisma.animalMember.findMany({
            where: { sessionId: sessionId}
        })

        let animalArray = new Array()

        while(cont<q){
            animalArray[cont] = await prisma.animal.findUnique({
                where: {id: array[cont].animalId}
            })

            cont++;
        }

        return animalArray;

    } */

    async list(animalListId: string): Promise<any[]> {
    // 1. Buscar todos os membros da sessão
    const members = await prisma.animalMember.findMany({
        where: { animalListId: animalListId }
    });

    // 2. Extrair os IDs dos animais
    const animalIds = members.map(member => member.animalId);

    // 3. Buscar todos os animais com base nos IDs em uma única query
    const animals = await prisma.animal.findMany({
        where: {
            id: {
                in: animalIds
            }
        }
    });

    return animals;
}

}