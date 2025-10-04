import { INoteRepository } from "../../interfaces.ts/INoteRepository";

export class ExportFullyCSVService{
    constructor(private noteRepo: INoteRepository){}
        async execute(): Promise<string>{
            const result = await this.noteRepo.exportFullyCSV()
            return result
        }
    }