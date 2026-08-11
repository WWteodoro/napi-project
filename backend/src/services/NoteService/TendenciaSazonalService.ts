import { INoteRepository } from "../../interfaces.ts/INoteRepository";

export class TendenciaService{
    constructor(private noteRepo: INoteRepository){}
        async execute(placeId: string, sessionIds: string[]): Promise<string>{
            const result = await this.noteRepo.tendencia({placeId, sessionIds})
            return result
        }
    }