import { IPlaceRepository } from "../../interfaces.ts/IPlaceRepository";
import { IPlace, IPlaceCreateRequest } from "../../interfaces.ts/IPlaceInterface";
import { Place } from "../../entities/place";

export class CreatePlaceService{
    constructor(private placeRepo: IPlaceRepository){}
    async execute(props: IPlaceCreateRequest): Promise<IPlace>{
        const place = new Place(props)

        const result = await this.placeRepo.create(place.toJson())

        return result
    }
}