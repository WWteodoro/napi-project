export interface IVideo {
    id: string;
    url: string;
    sessionId: string;
    hasAnimals: boolean;
    frameStride: number;
    totalFrames: number;
    fps: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IVideoCreateRequest{
    url: string
    sessionId: string
}

export interface IVideoDeleteRequest{
    id: string
}

export interface IVideoListRequest{
    sessionId: string
}

export interface IVideoWithAnimalsListRequest{
    sessionId: string;
}

export interface IVideoWithoutAnimalsListRequest{
    sessionId: string
}


// create note:notas eu relaciono com o bounfding box, criando o bounding box note/ update note/ exclude note/ get notes by video/ get notes by session/ get notes by content
//create bouding box: relaciona com o video/ exclude boundign box/ update boudngin box/ get bouding box by video/ 

