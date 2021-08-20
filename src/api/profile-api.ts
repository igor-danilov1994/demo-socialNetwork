import {instance, ApiResponseType} from "./api";
import {ProfileType} from "../typs/typs";

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/` + userId)
            .then(res => res.data)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId)
            .then(res => res.data);
    },
    updateStatus(status: string) {
        return instance.put<ApiResponseType>(`profile/status/`, {status: status})
            .then(resp => resp.data)
    },
};