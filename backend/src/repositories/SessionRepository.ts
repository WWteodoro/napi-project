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
    async getByPlace(placeId: string): Promise<any[]> {
    // 1. Buscamos as sessões e pedimos para o Prisma contar os vídeos anotados
    const result = await prisma.session.findMany({
        where: { placeId },
        include: {
            _count: {
                select: {
                    // Substitua "videos" pelo nome exato da sua relação no schema.prisma
                    videos: { 
                        where: { isAnnotated: true }
                    }
                }
            }
        }
    });

    if(!result) throw new AppError('Session Not Found');

    // 2. Mapeamos o resultado para entregar exatamente o que o front-end espera
    const sessionsFormatted = result.map(session => {
        // Extraímos o _count e o resto dos dados da sessão
        const { _count, ...sessionData } = session;
        
        return {
            ...sessionData,
            annotatedVideos: _count.videos // Repassa o número para a variável que o front vai ler
        };
    });

    return sessionsFormatted;
}

    async delete(id: string): Promise<void> {
        const result = await prisma.session.findUnique({
            where: { id }
        })

        await prisma.session.delete({
            where:{ id }
        })
    }
    async findAll(): Promise<ISession[]> {
        const result = await prisma.session.findMany()
        return result
    }

    async create(props: ISession): Promise<ISession> {
        const result = await prisma.session.create({
            data: { id: props.id, name: props.name, animalListId: props.animalListId, userId: props.userId, latitude: props.latitude, longitude: props.longitude, placeId: props.placeId} 
        })

        return result
    }

    async update(props: ISession, id: string): Promise<ISession> {
        const result = await prisma.session.update({
            where: { id },
            data: { id:props.id, name: props.name, animalListId: props.animalListId, latitude: props.latitude, longitude: props.longitude}
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