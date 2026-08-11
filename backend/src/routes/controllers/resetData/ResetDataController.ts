import { Request, Response } from "express";
import { IResetDataRepository } from "../../../interfaces.ts/IResetDataRepository";
import { ResetDataService } from "../../../services/ResetData/ResetDataService";

export class ResetDataController{
    constructor(private repo: IResetDataRepository){}
    async handle(req: Request, res: Response): Promise<Response>{
        const reset = new ResetDataService(this.repo)
        const data = await reset.execute()
        return res.json(data)
    }
}