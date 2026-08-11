export interface ISession {
    id: string;
    name: string;
    userId: string;
    animalListId: string;
    createdAt?: Date
    updatedAt?: Date
    totalVideos?: number
    processedVideos?: number
    latitude: string
    longitude: string
    placeId: string
}

export interface ISessionCreateRequest{
    name: string;
    userId: string;
    animalListId: string;
    createdAt?: Date
    updatedAt?: Date
    totalVideos?: number
    processedVideos?: number
    latitude: string
    longitude: string
    placeId: string
}

export interface ISessionUpdateRequest{
    id: string;
    name: string;
    animalListId: string;
    latitude: string
    longitude: string
}

export interface ISessionGetRequest{
    id: string
}

export interface ISessionGetByNameRequest{
    name: string;
}

export interface ISessionGetByUserRequest{
    userId: string;
}

export interface ISessionAddFolderRequest{
    id: string;
    folder: string;
}

export interface ISessionDeleteRequest{
    id: string
}

export interface ISessionGetByPlaceRequest{
    placeId: string
}