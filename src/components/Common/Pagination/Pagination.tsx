import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import styles from "../../Users/users.module.css";


type PaginationPropsType = {
    currentPage: number,
    totalItemsCount: number,
    pageSize: number,
    onPageChanged: (pageNumber: number) => void,
    isAuth: boolean,
    portionSize: number
}

export const Pagination: React.FC<PaginationPropsType> = ({
                                                              currentPage,
                                                              totalItemsCount,
                                                              pageSize,
                                                              onPageChanged,
                                                              isAuth,
                                                              portionSize
                                                          }) => {
    const [portionNumber, setPortionNumber] = useState(1);

    const pagesCount = Math.ceil(totalItemsCount / pageSize);

    const pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const portionCount = Math.ceil(pagesCount / portionSize);
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;

    if (!isAuth) {
        return <Redirect to={"/Login"}/>;
    }

    return (
        <div className={styles.pagination}>
            {portionNumber > 1 &&
            <button onClick={() => {
                setPortionNumber(portionNumber - 1)
            }}> PREV </button>
            }
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map((p) => {
                    return <span key={p}
                                 onClick={(e) => {
                                     onPageChanged(p)
                                 }}>
                        {p}
                    </span>
                })}

            {portionCount > portionNumber &&
            <button onClick={() => {
                setPortionNumber(portionNumber + 1)
            }}> NEXT </button>
            }
        </div>
    )
}



