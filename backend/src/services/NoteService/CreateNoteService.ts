import { INoteRepository } from "../../interfaces.ts/INoteRepository";
import { INote, INoteCreateRequest } from "../../interfaces.ts/INoteInterface";
import { Note } from "../../entities/note";

export class CreateNoteService{
    constructor(private noteRepo: INoteRepository){}
        async execute({quantity, dateTime, location, content, animal, userId, boundingBoxId}: INoteCreateRequest ): Promise<INote>{
            const note = new Note({quantity, dateTime, location, content, animal, userId, boundingBoxId})
            const result = await this.noteRepo.create(note.toJson())

            return result
        }
    }