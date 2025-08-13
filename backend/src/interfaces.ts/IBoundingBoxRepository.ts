import { IBoundingBox } from "./IBoundingBoxInterface";

export interface IBoundingBoxRepository{
    findAll(): Promise<IBoundingBox[]>
    create(props: IBoundingBox): Promise<IBoundingBox>
    update(props: IBoundingBox, id: string): Promise<IBoundingBox>
    delete(id: string): Promise<void>
    get(id: string): Promise<IBoundingBox>
    getByVideo(videoId: string): Promise<IBoundingBox[]>
}