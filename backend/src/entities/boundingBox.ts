import { IBoundingBox } from "../interfaces.ts/IBoundingBoxInterface";
import { createUUID } from "../utils/createUUID";

export class BoundingBox{
    id: IBoundingBox['id']
    videoId: IBoundingBox['videoId'];
    time: IBoundingBox['time'];
    x0: IBoundingBox['x0'];
    y0: IBoundingBox['y0'];
    x1: IBoundingBox['x1'];
    y1: IBoundingBox['y1'];
    confidence: IBoundingBox['confidence'];
    createdAt: IBoundingBox['createdAt'];
    updatedAt: IBoundingBox['updatedAt'];

    constructor(props: Omit<IBoundingBox, 'id'>, id?: string){
        this.id = id || createUUID();
        this.videoId = props.videoId;
        this.time =  props.time;
        this.x0 = props.x0;
        this.y0 = props.y0;
        this.x1 = props.x1;
        this.y1 = props.y1;
        this.confidence = props.confidence;
        this.createdAt = props.createdAt || new Date();
        this.updatedAt = new Date();
    }

    toJson(): IBoundingBox{
        return{
            id: this.id,
            videoId: this.videoId,
            time: this.time,
            x0: this.x0,
            y0: this.y0,
            x1: this.x1,
            y1: this.y1,
            confidence: this.confidence,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt 
        }
    }
}