import { IPlace } from "../../interfaces.ts/IPlaceInterface";
import { IPlaceRepository } from "../../interfaces.ts/IPlaceRepository";

export class ListPlacesService{
    constructor(private placeRepo: IPlaceRepository){}
    async execute(): Promise<IPlace[]>{
        return await this.placeRepo.findAll()
    }
}