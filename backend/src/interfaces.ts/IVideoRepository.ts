import { IVideo } from "./IVideoInterface";

export interface IVideoRepository{
    list(sessionId: string): Promise<IVideo[]>
    listWhithAnimals(sessionId: string): Promise<IVideo[]>
    listWithoutAnimals(sessionId: string): Promise<IVideo[]>
}