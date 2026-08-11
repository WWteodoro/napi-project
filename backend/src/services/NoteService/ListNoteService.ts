import { INote } from "../../interfaces.ts/INoteInterface";
import { INoteRepository } from "../../interfaces.ts/INoteRepository";

export class ListNoteService{
    constructor(private noteRepo: INoteRepository){}
        async execute(): Promise<INote[]>{
            const result = await this.noteRepo.findAll()
            return result
        }
    }