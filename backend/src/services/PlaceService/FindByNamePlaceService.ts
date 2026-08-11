import { AppError } from "../../errors/AppError";
import { IPlace, IPlaceGetByNameRequest } from "../../interfaces.ts/IPlaceInterface";
import { IPlaceRepository } from "../../interfaces.ts/IPlaceRepository";

export class FindByNamePlaceService{
    constructor(private placeRepo: IPlaceRepository){}
    async execute({name}: IPlaceGetByNameRequest): Promise<IPlace>{
        const result = await this.placeRepo.fundByName({name})
        if(!result) throw new AppError("Place Not Found")
        return result
    }
}