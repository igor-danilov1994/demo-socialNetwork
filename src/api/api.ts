import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "2d0b4124-f598-4990-be37-7a1b82411424"
    },
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return (
            instance.get(`users?page=${currentPage}&count=${pageSize}`)
                .then(response => {
                    return response.data;
                })
        )
    },
    follow(userId: number) {
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
    },
    getProfile(userId: number) {
        console.log("Этот метод устарел");
        return profileAPI.getProfile(userId);
    },
};

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get(`profile/` + userId)
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/` + userId);
    },
    updateStatus(status: string) {
        return instance.put(`profile/status/`, {status: status});
    },
};

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10,
}

type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodeEnum
    messages: string[]
}
type LoginResponseType = {
    data: {
        userId: number
    }
    resultCode: ResultCodeEnum
    messages: string[]
}

export const authAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me/`).then(response => response.data)
    },
    login(email: string, password: string, rememberMe = false) {
        return instance.post<LoginResponseType>(`auth/login`, {
            email,
            password,
            rememberMe
        }).then(response => response.data);
    },
    logout() {
        return instance.delete(`auth/login`);
    }
};
