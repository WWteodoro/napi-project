export interface INote{
    id: string;
    quantity: number;
    dateTime: string;
    location: string;
    content: string;
    animal: string;
    time: number[];
    userId: string;
    videoId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface INoteCreateRequest{
    quantity: number;
    dateTime: string;
    location: string;
    content: string;
    animal: string;
    time: number[];
    userId: string;
    videoId: string;
}

export interface INoteUpdateRequest{
    id: string;
    quantity: number;
    dateTime: string;
    location: string;
    content: string;
    animal: string;
    time: number[]
    userId: string;
    videoId: string;
}

export interface INoteListByVideo{
    videoId: string;
}

export interface INoteListBySession{
    sessionId: string;
}

export interface ExportLightCSV{
    sessionId: string;
}

export interface INoteGetRequest{
    id: string
}

export interface INoteGetByBoxRequest{
    time: number[]
}