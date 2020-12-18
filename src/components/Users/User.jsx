import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.png";
import {NavLink} from "react-router-dom";
import Pagination from "../Common/Pagination/Pagination";


let Users = ({currentPage, totalUsersCount, pageSize, onPageChanged, users, isAuth, ...props}) => {
    return (
        <div>
            <Pagination currentPage={currentPage} onPageChanged={onPageChanged}
                        totalUsersCount={totalUsersCount} pageSize={pageSize} isAuth={isAuth}
            />

            {
                users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                                <img src={u.photos.small != null ? u.photos.small : userPhoto}
                                     className={styles.userPhoto} alt='img'/>
                            </NavLink>
                        </div>
                        <div>
                            {u.followed
                                ? <button disabled={props.followingInProgress.some(id => id === u.id)}
                                          onClick={() => {
                                              props.unfollow(u.id)
                                          }}> Unfollow</button>

                                : <button disabled={props.followingInProgress.some(id => id === u.id)}
                                          onClick={() => {
                                              props.follow(u.id)
                                          }}> Follow</button>
                            }
                        </div>
                        <div>
                            <span>
                                <span>
                                    <span>
                                        <div>{u.name}</div>
                                        <div>{u.status}</div>
                                    </span>
                                    <span>
                                        <div>{"u.location.country"}</div>
                                        <div>{"u.location.city"}</div>
                                    </span>
                                </span>
                            </span>
                        </div>
                    </span>
                </div>)

            }
        </div>
    )
}
export default Users;
