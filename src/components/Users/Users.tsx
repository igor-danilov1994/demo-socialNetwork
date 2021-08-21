import React, {useEffect} from "react";
import {Pagination} from "../Common/Pagination/Pagination";
import styles from "./users.module.css";
import {User} from "./User";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {follow, requestUsers, unfollow} from "../../redux/usersReducer";

export const Users = (): JSX.Element => {

    const totalUsersCount = useSelector((state: AppStateType) => state.usersPage.totalUsersCount)
    const currentPage = useSelector((state: AppStateType) => state.usersPage.currentPage)
    const pageSize = useSelector((state: AppStateType) => state.usersPage.pageSize)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const users = useSelector((state: AppStateType) => state.usersPage.users)
    const followingInProgress = useSelector((state: AppStateType) => state.usersPage.followingInProgress)

    const dispatch = useDispatch()

    useEffect( () => {
        dispatch( requestUsers(currentPage, pageSize) )
    }, [] )

    const onPageChanged = (pageNumber: number): void => {
        dispatch( requestUsers(pageNumber, pageSize) )
    }

    const followUser = (userId: number) => {
        dispatch( follow(userId))
    }

    const unfollowUser = (userId: number) => {
        dispatch( unfollow(userId))
    }
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
                          unfollow={unfollowUser} follow={followUser}
                    />)}
            </div>
        </div>
    )
}
