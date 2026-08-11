import { INoteRepository } from "../../interfaces.ts/INoteRepository";

export class FrequenciaService{
    constructor(private noteRepo: INoteRepository){}
        async execute(placeId: string, sessionIds: string[]): Promise<string>{
            const result = await this.noteRepo.frequencia({placeId, sessionIds})
            return result
        }
    }