import { AppError } from "../../errors/AppError";
import { IResetDataRepository } from "../../interfaces.ts/IResetDataRepository";

export class ResetDataService{
    constructor(private repo: IResetDataRepository){}
    async execute(): Promise<void>{
        await this.repo.resetData()
    }
}