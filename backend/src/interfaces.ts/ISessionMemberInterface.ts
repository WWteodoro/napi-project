export interface ISessionMember{
    id: string;
    userId: string;
    sessionId: string;
    createdAt: string;
}

export interface ISessionAddUserRequest{
    userId: string;
    sessionId: string;
}

export interface ISessionMemberRemoveRequest{
    userId: string;
    sessionId: string;
}

export interface ISessionMemberGetByNameRequest{
    name: string;
}

export interface IListSessionUsersRequest{
    id: string;
}