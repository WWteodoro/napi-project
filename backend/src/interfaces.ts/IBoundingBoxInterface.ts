export interface IBoundingBox{
  id: string;
  videoId: string;
  time: number;
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  confidence: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBoundingBoxCreateRequest{
  videoId: string;
  time: number;
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  confidence: number;
}

export interface IBoundingBoxUpdateRequest{
  id: string;
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

export interface IBoundingBoxDeleteRequest{
  id: string;
}

export interface IBoundingBoxGetRequest{
  id: string;
}

export interface IBoundingBoxVideoListRequest{
  videoId: string;
}