import { IPlace, IPlaceDeleteRequest } from "../../interfaces.ts/IPlaceInterface";
import { IPlaceRepository } from "../../interfaces.ts/IPlaceRepository";

export class DeletePlaceService{
    constructor(private placeRepo: IPlaceRepository){}
    async execute({ id }: IPlaceDeleteRequest): Promise<void>{
        await this.placeRepo.findOnePlace(id)
        await this.placeRepo.delete({id})
    }
}