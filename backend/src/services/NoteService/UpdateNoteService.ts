import { Note } from "../../entities/note";
import { INote, INoteUpdateRequest } from "../../interfaces.ts/INoteInterface";
import { INoteRepository } from "../../interfaces.ts/INoteRepository";

export class UpdateNoteService{
    constructor(private noteRepo: INoteRepository){}
        async execute(props: INoteUpdateRequest): Promise<INote>{
            const result = await this.noteRepo.get(props.id)
            console.log(props.animal)
            const note = new Note({
                quantity: props.quantity || result.quantity,
                dateTime: props.dateTime || result.dateTime,
                location: props.location || result.location,
                content: props.content || result.content,
                animal: props.animal || result.animal,
                userId: props.userId || result.userId,
                boundingBoxId: props.boundingBoxId || result.boundingBoxId
            }, result.id)
            console.log(note)

            const ret = await this.noteRepo.update(result.id, note.toJson())

            return ret
        }   
    }