import { IBoundingBoxGetRequest, IBoundingBox } from "../../interfaces.ts/IBoundingBoxInterface";
import { IBoundingBoxRepository } from "../../interfaces.ts/IBoundingBoxRepository";

export class GetVideoBoundingBoxService{
    constructor(private boxRepo: IBoundingBoxRepository){}
    async execute({ id }: IBoundingBoxGetRequest): Promise<IBoundingBox[]>{
            const result = await this.boxRepo.getByVideo(id)
    
            return result
}
}