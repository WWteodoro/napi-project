import { INoteRepository } from "../../interfaces.ts/INoteRepository";

export class AbundanciaService{
    constructor(private noteRepo: INoteRepository){}
        async execute(placeId: string): Promise<string>{
            const result = await this.noteRepo.abundanciaDeAnimais({placeId})
            return result
        }
    }