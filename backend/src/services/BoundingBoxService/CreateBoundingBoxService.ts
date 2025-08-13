import { BoundingBox } from "../../entities/boundingBox";
import { IBoundingBox, IBoundingBoxCreateRequest } from "../../interfaces.ts/IBoundingBoxInterface";
import { IBoundingBoxRepository } from "../../interfaces.ts/IBoundingBoxRepository";

export class CreateBoundingBoxService{
    constructor(private boxRepo: IBoundingBoxRepository){}
    async execute({videoId, time, x0, y0, x1, y1, confidence}: IBoundingBoxCreateRequest): Promise<IBoundingBox>{

        const box = new BoundingBox({videoId, time, x0, y0, x1, y1, confidence})

        const result = await this.boxRepo.create(box.toJson())

        return result
    }
}