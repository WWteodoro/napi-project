import { IVideo } from "./IVideoInterface";

export interface IVideoRepository{
    list(sessionId: string, hasAnimalsFlag?: string, isAnnotatedFlag?: string): Promise<IVideo[]>
    listWhithAnimals(sessionId: string): Promise<IVideo[]>
    listWithoutAnimals(sessionId: string): Promise<IVideo[]>
    listWithAnimalsAndNotes(sessionId: string): Promise<IVideo[]>
    listWithAnimalsNoNotes(sessionId:string): Promise<IVideo[]>
    excludeGroup(sessionId:string): Promise<void>
}