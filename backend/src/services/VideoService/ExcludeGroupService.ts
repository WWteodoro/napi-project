import { IVideoListRequest, IVideo } from "../../interfaces.ts/IVideoInterface";
import { IVideoRepository } from "../../interfaces.ts/IVideoRepository";

export class ExcludeGroupService{
    constructor(private VideoRepo: IVideoRepository){}
    async execute({ sessionId }: IVideoListRequest): Promise<void>{
        await this.VideoRepo.excludeGroup(sessionId)
    }
}