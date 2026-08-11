import { IBoundingBoxDeleteRequest } from "../../interfaces.ts/IBoundingBoxInterface";
import { IBoundingBoxRepository } from "../../interfaces.ts/IBoundingBoxRepository";

export class DeleteBoundingBoxService{
    constructor(private boxRepo: IBoundingBoxRepository){}
    async execute({ id }: IBoundingBoxDeleteRequest): Promise<void>{
        await this.boxRepo.get(id)
        await this.boxRepo.delete(id)
    }
}