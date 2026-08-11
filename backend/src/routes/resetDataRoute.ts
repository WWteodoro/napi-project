import { Request, Response, Router } from "express";
import { ResetDataRepository } from "../repositories/ResetDataRepository";
import { ResetDataController } from "./controllers/resetData/ResetDataController";
import { resolveController } from "../adapters/resolverController";

export const resetDataRoute = Router();

const repo = new ResetDataRepository()
const resetData = new ResetDataController(repo)

resetDataRoute.post('/', resolveController(async (req: Request, res:Response) => {
    return await resetData.handle(req, res)
}))