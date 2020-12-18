import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.png";
import {NavLink} from "react-router-dom";


let User = (props) => {
    return (
        <div className={styles.userItem}>

            <div className={styles.userAvatar}>
                <NavLink to={'/profile/' + props.user.id}>
                    <img src={props.user.photos.small != null ? props.user.photos.small : userPhoto}
                         className={styles.userPhoto} alt='img'/>
                </NavLink>
            </div>

            <div className={styles.userInfo}>
                <div>
                    <span>
                        <span>
                            <div>{props.user.name}</div>
                            <div>{props.user.status}</div>
                        </span>
                        <span>
                            <div>{"user.location.country"}</div>
                            <div>{"user.location.city"}</div>
                        </span>
                    </span>
                </div>
                <div className={styles.userFollowToggle}>
                    {props.user.followed
                        ? <button disabled={props.followingInProgress.some(id => id === props.user.id)}
                                  onClick={() => {
                                      props.unfollow(props.user.id)
                                  }}> Unfollow</button>

                        : <button disabled={props.followingInProgress.some(id => id === props.user.id)}
                                  onClick={() => {
                                      props.follow(props.user.id)
                                  }}> Follow</button>
                    }
                </div>
            </div>
        </div>
    )
}
export default User;
