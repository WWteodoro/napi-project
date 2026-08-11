import { ExportLightCSV } from "../../interfaces.ts/INoteInterface";
import { INoteRepository } from "../../interfaces.ts/INoteRepository";

export class ExportLightCSVService{
    constructor(private noteRepo: INoteRepository){}
        async execute({ sessionId, outputPath }: ExportLightCSV): Promise<string>{
            const result = await this.noteRepo.exportLightCSV(sessionId, outputPath)
            return result
        }
    }