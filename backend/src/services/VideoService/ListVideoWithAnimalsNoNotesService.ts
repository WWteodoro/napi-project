import { IVideoListRequest, IVideo } from "../../interfaces.ts/IVideoInterface"
import { IVideoRepository } from "../../interfaces.ts/IVideoRepository"

export class ListVideoWithAnimalsNoNotesService{
    constructor(private VideoRepo: IVideoRepository){}
    async execute({ sessionId }: IVideoListRequest): Promise<IVideo[]>{
        const result = await this.VideoRepo.listWithAnimalsNoNotes(sessionId)
        return result
    }
}