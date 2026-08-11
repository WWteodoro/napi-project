import { AppError } from "../errors/AppError";
import { IPlace, IPlaceCreateRequest, IPlaceDeleteRequest, IPlaceGetByNameRequest, IPlaceUpdateRequest } from "../interfaces.ts/IPlaceInterface";
import { IPlaceRepository } from "../interfaces.ts/IPlaceRepository";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export class PlaceRepository implements IPlaceRepository{
    constructor(){}
    async findAll(): Promise<IPlace[]> {
         const result = await prisma.place.findMany()
         return result
    }
    
    async findOnePlace(id: string): Promise<IPlace> {
        const result = await prisma.place.findUnique({
            where: {id}
        })

        if(!result) throw new AppError('Place not found')
        return result
    }

    async create(props: IPlace): Promise<IPlace> {
        const result = await prisma.place.create({
            data: {id:props.id, name: props.name}
        })

        return result
    }

    async update(props: IPlaceUpdateRequest, id: string): Promise<IPlace> {
        const result = await prisma.place.update({
            where: {id},
            data: {id:props.id, name: props.name}
        })

        return result
    }

    async delete(props: IPlaceDeleteRequest): Promise<void> {
        await prisma.place.delete({
            where: {id: props.id}
        })
    }

    async fundByName(props: IPlaceGetByNameRequest): Promise<IPlace> {
        const result = await prisma.place.findUnique({
            where: {name: props.name}
        })

        if(!result) throw new AppError('Place not found')
        return result
    }

}