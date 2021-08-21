import React from "react";
import {Users} from "./Users";
import Preloader from "../Common/Preloader/Preloader";
import {AppStateType} from "../../redux/redux-store";
import {useSelector} from "react-redux";

export const UsersPage = () => {
    const isFetching = useSelector((state: AppStateType) => state.usersPage.isFetching)

    return <>
        {isFetching ?
            <Preloader/> : null}
        <Users/>
    </>
}




