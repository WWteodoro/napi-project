import { Session } from "../../entities/session";
import { ISession, ISessionGetByPlaceRequest, ISessionGetByUserRequest } from "../../interfaces.ts/ISessionInterface";
import { ISessionRepositoy } from "../../interfaces.ts/ISessionRepository";

export class GetByPlaceSessionService{
    constructor(private sessionRepo: ISessionRepositoy){}
    async execute({placeId}: ISessionGetByPlaceRequest ): Promise<ISession[]>{
        const result = await this.sessionRepo.getByPlace(placeId)

        return result
    }
}