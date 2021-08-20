import axios from "axios";

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10,
}


export type GetItemsType<T> = {
    items: T[],
    totalCount: number,
    error: string | null,
}

export type ApiResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D;
    messages: string[],
    resultCode: RC
}

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "2d0b4124-f598-4990-be37-7a1b82411424"
    }
});

