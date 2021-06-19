import React from "react";
import {Pagination} from "../Common/Pagination/Pagination";
import styles from "./users.module.css";
import {UserType} from "../../typs/typs";
import {User} from "./User";

type UsersPropsType = {
    currentPage: number
    totalUsersCount: number
    onPageChanged: (pageNumber: number) => void
    pageSize: number
    isAuth: boolean
    users: Array<UserType>
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

export const Users: React.FC<UsersPropsType> = ({
                                                    currentPage,
                                                    totalUsersCount,
                                                    onPageChanged,
                                                    pageSize,
                                                    isAuth,
                                                    users,
                                                    followingInProgress,
                                                    unfollow,
                                                    follow
                                                }): JSX.Element => {

    return (
        <div>
            <Pagination currentPage={currentPage} onPageChanged={onPageChanged}
                        totalItemsCount={totalUsersCount} pageSize={pageSize}
                        isAuth={isAuth} portionSize={10}
            />

            <div className={styles.totalUser}>
                {users.map(u =>
                    <User user={u} key={u.id}
                          followingInProgress={followingInProgress}
                          unfollow={unfollow} follow={follow}
                    />)}
            </div>
        </div>
    )
}
