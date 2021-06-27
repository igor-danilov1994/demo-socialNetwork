import React from 'react';
import s from './Post.module.css';


type PostPropsType = {
    message: string,
    likesCount: number
}

export const Post: React.FC<PostPropsType> = ({message, likesCount}) => {
    return (
        <div className={s.item}>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSq_I0JFO2DxoAV3J-sI7ajtx0qW0Q5neaY_A&usqp=CAU"
                alt="avatar"/>
            {message}
            <div>
                <button>like</button>
                {likesCount}
            </div>
        </div>
    )
}
