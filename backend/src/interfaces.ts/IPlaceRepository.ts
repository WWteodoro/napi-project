import { IPlace, IPlaceCreateRequest, IPlaceDeleteRequest, IPlaceGetByNameRequest, IPlaceUpdateRequest } from "./IPlaceInterface";

export interface IPlaceRepository{
    findAll(): Promise<IPlace[]>
    findOnePlace(id: string): Promise<IPlace>
    create(props: IPlace): Promise<IPlace>
    update(props: IPlaceUpdateRequest, id: string): Promise<IPlace>
    delete(props: IPlaceDeleteRequest): Promise<void>
    fundByName(props: IPlaceGetByNameRequest): Promise<IPlace>
}