import { IBoundingBox } from "../../interfaces.ts/IBoundingBoxInterface";
import { IBoundingBoxRepository } from "../../interfaces.ts/IBoundingBoxRepository";

export class ListBoundingBoxService{
    constructor(private boxRepo: IBoundingBoxRepository){}
    async execute(): Promise<IBoundingBox[]>{
        const result = await this.boxRepo.findAll()
        return result
    }
}