import { INote, INoteGetRequest } from "../../interfaces.ts/INoteInterface";
import { INoteRepository } from "../../interfaces.ts/INoteRepository";

export class GetNoteService{
    constructor(private noteRepo: INoteRepository){}
    async execute({id}: INoteGetRequest): Promise<INote>{
        const result = await this.noteRepo.get(id)
        return result
    }
}