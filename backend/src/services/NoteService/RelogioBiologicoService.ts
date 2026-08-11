import { INoteRepository } from "../../interfaces.ts/INoteRepository";

export class RelogioBiologicoService{
    constructor(private noteRepo: INoteRepository){}
        async execute(placeId: string): Promise<string>{
            const result = await this.noteRepo.relogioBiologico({placeId})
            return result
        }
    }