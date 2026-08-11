import { AppError } from "../../errors/AppError";
import { IPlace, IPlaceGetRequest } from "../../interfaces.ts/IPlaceInterface";
import { IPlaceRepository } from "../../interfaces.ts/IPlaceRepository";

export class GetPlaceService{
    constructor(private placeRepo: IPlaceRepository){}
    async execute({id}: IPlaceGetRequest): Promise<IPlace>{
        const result = await this.placeRepo.findOnePlace(id)
        if(!result) throw new AppError("Place not found");
        return result
    }
}