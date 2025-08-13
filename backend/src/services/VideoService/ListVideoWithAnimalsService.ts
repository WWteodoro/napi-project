import { IVideoListRequest, IVideo } from "../../interfaces.ts/IVideoInterface";
import { IVideoRepository } from "../../interfaces.ts/IVideoRepository";

export class ListVideoWithAnimalsService{
    constructor(private VideoRepo: IVideoRepository){}
    async execute({ sessionId }: IVideoListRequest): Promise<IVideo[]>{
        const result = await this.VideoRepo.listWhithAnimals(sessionId)
        return result
    }
}