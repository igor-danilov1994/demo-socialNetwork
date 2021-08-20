import {instance, ApiResponseType} from "./api";

type MeResponseDataType = {
    id: number
    email: string
    login: string
}

export type LoginResponseDataType = {
    userId: number
}

export const authAPI = {
    me() {
        return instance.get<ApiResponseType<MeResponseDataType>>(`auth/me/`).then(response => response.data)
    },
    login(email: string, password: string, rememberMe = false) {
        return instance.post<ApiResponseType<LoginResponseDataType>>(`auth/login`, {
            email,
            password,
            rememberMe
        }).then(response => response.data);
    },
    logout() {
        return instance.delete(`auth/login`);
    }
};