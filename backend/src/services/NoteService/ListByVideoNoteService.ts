import { INote, INoteListByVideo } from "../../interfaces.ts/INoteInterface";
import { INoteRepository } from "../../interfaces.ts/INoteRepository";

export class ListByVideoNoteService{
    constructor(private noteRepo: INoteRepository){}
        async execute({videoId}: INoteListByVideo): Promise<INote[]>{
            const result = await this.noteRepo.listByvideo(videoId)
            return result
        }
    }