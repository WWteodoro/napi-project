export interface IJWTPayload {
    id: string;
    email: string;
}

export interface IJWTRepository {
    generate(payload: IJWTPayload): string;
    verify(key: string): IJWTPayload;
}