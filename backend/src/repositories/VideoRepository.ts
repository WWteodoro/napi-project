import { PrismaClient } from "@prisma/client";
import { IVideoRepository } from "../interfaces.ts/IVideoRepository";
import { IVideo } from "../interfaces.ts/IVideoInterface";

const prisma = new PrismaClient();
export class VideoRepository implements IVideoRepository{
    constructor(){}
    async list(sessionId: string): Promise<IVideo[]> {
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