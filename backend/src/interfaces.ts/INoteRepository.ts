import { INote } from "./INoteInterface";

export interface INoteRepository{
    findAll():Promise<INote[]>
    create(props: INote): Promise<INote>
    update(id: string, props: INote): Promise<INote>
    listByvideo(videoId:string): Promise<INote[]>
    listBySession(sessionId:string):Promise<INote[]>
    exportFullyCSV():Promise<string>
    exportLightCSV(sessionId:string):Promise<string>
    get(id:string):Promise<INote>
}