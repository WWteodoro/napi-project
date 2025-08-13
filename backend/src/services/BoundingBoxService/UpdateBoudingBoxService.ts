import { BoundingBox } from "../../entities/boundingBox";
import { IBoundingBox, IBoundingBoxUpdateRequest } from "../../interfaces.ts/IBoundingBoxInterface";
import { IBoundingBoxRepository } from "../../interfaces.ts/IBoundingBoxRepository";

export class UpdateBoundingBoxService{
    constructor(private boxRepo: IBoundingBoxRepository){}
    async execute({id,x0, y0, x1, y1}: IBoundingBoxUpdateRequest): Promise<IBoundingBox>{
        const actual = await this.boxRepo.get(id)

        const box = new BoundingBox({
            x0: x0 || actual.x0,
            x1: x1 || actual.x1,
            y0: y0 || actual.y0,
            y1: y1 || actual.y1,
            confidence: actual.confidence,
            time: actual.time,
            videoId: actual.videoId

        }, actual.id)

        const result = await this.boxRepo.update(box.toJson(), id)

        return result
    }
}