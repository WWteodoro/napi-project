import { PrismaClient } from "@prisma/client";
import { ISessionRepositoy } from "../interfaces.ts/ISessionRepository";
import { ISession } from "../interfaces.ts/ISessionInterface";
import { IUser } from "../interfaces.ts/IUserInterface";
import { AnimalList } from "../entities/animalList";
import { AppError } from "../errors/AppError";
import { processVideos } from "../utils/proccessVideos";

const prisma = new PrismaClient();
export class SessionRepository implements ISessionRepositoy{
    constructor(){}
    async findAll(): Promise<ISession[]> {
        const result = await prisma.session.findMany()
        return result
    }

    async create(props: ISession): Promise<ISession> {
        const result = await prisma.session.create({
            data: { id: props.id, name: props.name, animalListId: props.animalListId, userId: props.userId} 
        })

        return result
    }

    async update(props: ISession, id: string): Promise<ISession> {
        const result = await prisma.session.update({
            where: { id },
            data: { id:props.id, name: props.name, animalListId: props.animalListId}
        })

        return result
    }

    async get(id: string): Promise<ISession> {
        const result = await prisma.session.findUnique({
            where: { id }
        })

        if(!result) throw new AppError('Session Not Found')

            return result
    }

    async getByName(name: string): Promise<ISession[]> {
        const result = await prisma.session.findMany({
            where: { name }
        })

        if(!result) throw new AppError('Session Not Found')

            return result
    }

    async getByUser(userId: string): Promise<ISession[]> {
        const result = await prisma.session.findMany({
            where: { userId }
        })

        if(!result) throw new AppError('Session Not Found')

            return result
    }

    async addFolder(id: string, folder: string): Promise<void> {
        const session = await prisma.session.findUnique({
            where: { id }
        })

        if(!session) throw new AppError('Session Not Found')

        processVideos(folder, id)

        console.log("Vídeos processados!!!")
    }
}