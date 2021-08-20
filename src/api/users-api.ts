import {GetItemsType, instance, ApiResponseType} from "./api";
import {UserType} from "../typs/typs";


export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return (
            instance.get<GetItemsType<UserType>>(`users?page=${currentPage}&count=${pageSize}`)
                .then(response => {
                    return response.data;
                })
        )
    },
    follow(userId: number) {
        return instance.post<ApiResponseType>(`follow/${userId}`)
            .then(resp => resp.data)
    },
    unfollow(userId: number) {
        return instance.delete<ApiResponseType>(`follow/${userId}`)
            .then(resp => resp.data)
    }
};