import { PrismaClient } from "@prisma/client";
import { IVideoRepository } from "../interfaces.ts/IVideoRepository";
import { IVideo } from "../interfaces.ts/IVideoInterface";

const prisma = new PrismaClient();
export class VideoRepository implements IVideoRepository{
    constructor(){}
    async excludeGroup(sessionId: string): Promise<void> { //exclui videos sem animais de uma determinada sessão
        await prisma.video.deleteMany({
            where: {sessionId, hasAnimals: false}
        })
    }

    async listWithAnimalsAndNotes(sessionId: string): Promise<IVideo[]> {
        const result = await prisma.video.findMany({
            where: {sessionId, hasAnimals: true, isAnnotated:true}
        })

        return result
    }

    async listWithAnimalsNoNotes(sessionId: string): Promise<IVideo[]> {
        const result = await prisma.video.findMany({
            where: {sessionId, hasAnimals: true, isAnnotated:false}
        })

        return result
    }

    async list(sessionId: string, flag?:string): Promise<IVideo[]> {
        if(flag === "note"){
           const result = await prisma.video.findMany({
            where: { sessionId, isAnnotated:true }
        })
        return result; 
        }

        if(flag === "!note"){
            const result = await prisma.video.findMany({
            where: { sessionId, isAnnotated:false }
        })
        return result; 
        }

        const result = await prisma.video.findMany({
            where: { sessionId }
        })
        return result;
    }
    
    async listWhithAnimals(sessionId: string): Promise<IVideo[]> {
        const result = await prisma.video.findMany({
            where: {sessionId, hasAnimals: true}
        })

        return result
    }
    
    async listWithoutAnimals(sessionId: string): Promise<IVideo[]> {
        const result = await prisma.video.findMany({
            where: {sessionId, hasAnimals: false}
        })

        return result
    }
}