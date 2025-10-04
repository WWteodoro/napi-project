import { INote, INoteGetByBoxRequest, INoteGetRequest } from "../../interfaces.ts/INoteInterface";
import { INoteRepository } from "../../interfaces.ts/INoteRepository";

export class GetNoteByBoxService{
    constructor(private noteRepo: INoteRepository){}
    async execute({boundingBoxId}: INoteGetByBoxRequest): Promise<INote>{
        const result = await this.noteRepo.getByBox(boundingBoxId)
        return result
    }
}