import { Request, Response } from "express";
import { ISessionRepositoy } from "../../../interfaces.ts/ISessionRepository";
import { GetByNameSessionService } from "../../../services/SessionService/GetByNameSessionService";
import { GetByUserSessionService } from "../../../services/SessionService/GetByUserSessionService";
import { GetByPlaceSessionService } from "../../../services/SessionService/GetByPlaceSessionService";


export class GetByPlaceSessionController{
    constructor(private sessionRepo: ISessionRepositoy){}
    async handle(req: Request, res: Response): Promise<Response>{
        const { placeId } = req.params;
        console.log(placeId)
        const getByPlaceSessionService = new GetByPlaceSessionService(this.sessionRepo)
        const result = await getByPlaceSessionService.execute({ placeId })

        return res.status(200).json(result)
    }
}