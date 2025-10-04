import { INote, INoteListBySession } from "../../interfaces.ts/INoteInterface";
import { INoteRepository } from "../../interfaces.ts/INoteRepository";

export class ListBySessionNoteService{
    constructor(private noteRepo: INoteRepository){}
        async execute({sessionId}: INoteListBySession): Promise<INote[]>{
            const result = await this.noteRepo.listBySession(sessionId)
            return result
        }
    }