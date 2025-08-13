import { IBoundingBox, IBoundingBoxGetRequest } from "../../interfaces.ts/IBoundingBoxInterface";
import { IBoundingBoxRepository } from "../../interfaces.ts/IBoundingBoxRepository";

export class GetBoundingBoxService{
    constructor(private boxRepo: IBoundingBoxRepository){}
    async execute({ id }: IBoundingBoxGetRequest): Promise<IBoundingBox>{
        const result = await this.boxRepo.get(id)

        return result
    }
}