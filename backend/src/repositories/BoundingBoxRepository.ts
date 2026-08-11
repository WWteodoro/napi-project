import { PrismaClient } from "@prisma/client";
import { IBoundingBoxRepository } from "../interfaces.ts/IBoundingBoxRepository";
import { IBoundingBox } from "../interfaces.ts/IBoundingBoxInterface";
import { AppError } from "../errors/AppError";

const prisma = new PrismaClient();
export class BoundingBoxRepository implements  IBoundingBoxRepository{
    constructor(){}
    async findAll(): Promise<IBoundingBox[]> {
        const result = await prisma.boundingBox.findMany()
        return result
    }

    async create(props: IBoundingBox): Promise<IBoundingBox> {
        const result = await prisma.boundingBox.create({
            data: { id: props.id, videoId: props.videoId, time: props.time, x0: props.x0, y0: props.y0, x1: props.x1, y1: props.y1, confidence: props.confidence}
        })

        return result
    }

    async update(props: IBoundingBox, id: string): Promise<IBoundingBox> {
       const result = await prisma.boundingBox.update({
        where: { id },
        data: {id: props.id, videoId: props.videoId, time: props.time, x0: props.x0, y0: props.y0, x1: props.x1, y1: props.y1, confidence: props.confidence}
       })

       return result
    }

    async delete(id: string): Promise<void> {
        await prisma.boundingBox.delete({
            where: { id }
        });
    }

    async get(id: string): Promise<IBoundingBox> {
        const result = await prisma.boundingBox.findUnique({
            where: { id }
        })

        if(!result) throw new AppError('Box not found')
        return result
    }

    async getByVideo(videoId: string): Promise<IBoundingBox[]> {
        const result = await prisma.boundingBox.findMany({
            where: { videoId: videoId}
        })

        return result
    }

}