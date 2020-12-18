import React from "react";
import styles from "../Users/users.module.css";
import Redirect from "react-router-dom";


let Pagination = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    if (!props.isAuth) {
        return <Redirect to={"/Login"}/>;
    }

    return (
        <div>
            <ul className={styles.pagination}>
                {pages.map(p => {
                    return (
                        <li className={props.currentPage === p && styles.selectedPage}
                            onClick={(e) => {
                                props.onPageChanged(p)
                            }}>{p}</li>
                    )
                })}
            </ul>
            </div>

    )
}
export default Pagination;
