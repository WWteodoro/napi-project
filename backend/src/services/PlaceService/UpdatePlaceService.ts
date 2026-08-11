import { Place } from "../../entities/place";
import { IPlace, IPlaceUpdateRequest } from "../../interfaces.ts/IPlaceInterface";
import { IPlaceRepository } from "../../interfaces.ts/IPlaceRepository";

export class UpdatePlaceService{
    constructor(private placeRepo: IPlaceRepository){}
    async execute({id, name}: IPlaceUpdateRequest): Promise<IPlace>{
        const result = await this.placeRepo.findOnePlace(id)

        const place = new Place({
            name: name || result.name
        }, result.id)

        const resulta = await this.placeRepo.update(place.toJson(), id)

        return resulta
    }
}