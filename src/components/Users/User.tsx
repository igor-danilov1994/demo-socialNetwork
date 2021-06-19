import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.png";
import {NavLink} from "react-router-dom";
import {UserType} from "../../typs/typs";


type UserPropsType = {
    user: UserType
    followingInProgress: number[]
    unfollow: (id: number) => void
    follow: (id: number) => void
}

export const User: React.FC<UserPropsType> = ({user, followingInProgress, unfollow, follow}): JSX.Element => {
    return (
        <div className={styles.userItem}>

            <div className={styles.userAvatar}>
                <NavLink to={'/profile/' + user.id}>
                    <img src={user.photos.small != null ? user.photos.small : userPhoto}
                         className={styles.userPhoto} alt='img'/>
                </NavLink>
            </div>

            <div className={styles.userInfo}>
                <div>
                    <span>
                        <span>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                        </span>
                        <span>
                            <div>{"user.location.country"}</div>
                            <div>{"user.location.city"}</div>
                        </span>
                    </span>
                </div>
                <div className={styles.userFollowToggle}>
                    {user.followed
                        ? <button disabled={followingInProgress.some(id => id === user.id)}
                                  onClick={() => {
                                      unfollow(user.id)
                                  }}> Unfollow</button>

                        : <button disabled={followingInProgress.some(id => id === user.id)}
                                  onClick={() => {
                                      follow(user.id)
                                  }}> Follow</button>
                    }
                </div>
            </div>
        </div>
    )
}
