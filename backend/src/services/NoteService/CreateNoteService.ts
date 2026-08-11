import { INoteRepository } from "../../interfaces.ts/INoteRepository";
import { INote, INoteCreateRequest } from "../../interfaces.ts/INoteInterface";
import { Note } from "../../entities/note";

export class CreateNoteService{
    constructor(private noteRepo: INoteRepository){}
        async execute({quantity, dateTime, content, animal, time, userId, videoId}: INoteCreateRequest ): Promise<INote>{
            const note = new Note({quantity, dateTime, content, animal, time, userId, videoId})
            const result = await this.noteRepo.create(note.toJson())

            return result
        }
    }