import React from "react";
import Pagination from "../Common/Pagination/Pagination";
import User from "./User";
import styles from "./users.module.css";


let Users = (props) => {

    return (
        <div>
            <Pagination currentPage={props.currentPage} onPageChanged={props.onPageChanged}
                        totalItemsCount={props.totalUsersCount} pageSize={props.pageSize}
                        isAuth={props.isAuth} portionSize={10}
            />

            <div className={styles.totalUser}>
                {props.users.map(u =>
                    <User user={u} key={u.id}
                          followingInProgress={props.followingInProgress}
                          unfollow={props.unfollow} follow={props.follow}
                    />)}
            </div>
        </div>
    )
}
export default Users;
