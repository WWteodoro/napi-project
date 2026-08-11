import { INoteRepository } from "../../interfaces.ts/INoteRepository";

export class ExportFullyCSVService{
    constructor(private noteRepo: INoteRepository){}
        async execute(outputPath: string, placeId: string): Promise<string>{
            const result = await this.noteRepo.exportFullyCSV(outputPath, placeId)
            return result
        }
    }