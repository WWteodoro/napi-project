import { INote, INoteGraphNoFilter, INoteGraphWithFilter } from "./INoteInterface";

export interface INoteRepository{
    findAll():Promise<INote[]>
    create(props: INote): Promise<INote>
    update(id: string, props: INote): Promise<INote>
    listByvideo(videoId:string): Promise<INote[]>
    listBySession(sessionId:string):Promise<INote[]>
    exportFullyCSV(outputPath: string, placeId: string):Promise<string>
    exportLightCSV(sessionId:string, outputPath:string):Promise<string>
    get(id:string):Promise<INote>
    abundanciaDeAnimais(data: INoteGraphNoFilter): Promise<string>
    relogioBiologico(data: INoteGraphNoFilter): Promise<string>
    frequencia(data: INoteGraphWithFilter): Promise<string>
    tendencia(data: INoteGraphWithFilter): Promise<string>
}