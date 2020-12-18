import React from 'react';
import s from "../Navbar.module.css";


const Friends = (props) => {
    return (
        <div className={s.itemFriends}>
            <h2>Friends</h2>
            <div className={s.itemNames}>
                <div className={s.itemName}>
                    <div>
                         {props.dialogs[0].avatar}
                    </div>
                    <span>{props.dialogs[0].name}</span>
                </div>
                <div className={s.itemName}>
                    <div>
                         {props.dialogs[1].avatar}
                    </div>
                    <span>{props.dialogs[1].name}</span>
                </div>
                <div className={s.itemName}>
                    <div>
                        {props.dialogs[2].avatar}
                    </div>
                    <span>{props.dialogs[2].name}</span>
                </div>
            </div>
        </div>
    )
}

export default Friends;
