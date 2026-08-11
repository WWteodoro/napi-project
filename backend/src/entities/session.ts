import { ISession } from "../interfaces.ts/ISessionInterface";
import { createUUID } from "../utils/createUUID";

export class Session{
    id: ISession['id']
    name: ISession['name']
    userId: ISession['userId']
    animalListId: ISession['animalListId']
    createdAt: ISession['createdAt']
    updatedAt: ISession['updatedAt']
    totalVideos: ISession['totalVideos']
    processedVideos: ISession['processedVideos']
    latitude: ISession['latitude']
    longitude: ISession['longitude']
    placeId: ISession['placeId']

    constructor(props: Omit<ISession, 'id'>, id?:string){
        this.id = id || createUUID();
        this.name = props.name;
        this.userId = props.userId;
        this.animalListId = props.animalListId;
        this.createdAt = props.createdAt || new Date();
        this.updatedAt = new Date()
        this.totalVideos = props.totalVideos || 0;
        this.processedVideos = props.processedVideos || 0;
        this.latitude = props.latitude || " ";
        this.longitude = props.longitude || " ";
        this.placeId = props.placeId

    }

    toJson(): ISession{
        return{
            id: this.id,
            name: this.name,
            userId: this.userId,
            animalListId: this.animalListId,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            totalVideos: this.totalVideos,
            processedVideos: this.processedVideos,
            latitude: this.latitude,
            longitude: this.longitude,
            placeId: this.placeId
        }
    }
}