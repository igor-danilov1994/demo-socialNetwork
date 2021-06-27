import React from 'react';
import {Profile} from "./profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, updateStatus} from "../../redux/profileReducerе";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType} from "../../typs/typs";

type ProfileContainerPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    history: string[]
    authorizedUserId: number
    match: any
    profile: ProfileType
    status: string
}

const ProfileContainer: React.FC<ProfileContainerPropsType> = ({
                                                                   getUserProfile,
                                                                   getStatus,
                                                                   history,
                                                                   authorizedUserId,
                                                                   match,
                                                                   profile,
    status
                                                               }) => {

    let userId = match.params.userId;
    if (!userId) {
        userId = authorizedUserId;
        if (!userId) {
            history.push("/Login");
        }
    }
    getUserProfile(userId);
    getStatus(userId)


    return (
        <Profile
            profile={profile}
            status={status}
            updateStatus={updateStatus}
        />
    )
}

type MapStateToPropsType = {
    profile: ProfileType | null,
    status: string,
    authorizedUserId: number | null,
    isAuth: boolean,
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
});

export default compose(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
    withRouter,
    withAuthRedirect,
)(ProfileContainer);

