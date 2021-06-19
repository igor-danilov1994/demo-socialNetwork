import * as React from 'react';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContaner";
import {ProfileType} from "../../typs/typs";

export type ProfilePropsType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
}

export const Profile: React.FC<ProfilePropsType> = ({profile, updateStatus, status}) => {
    return (
        <div>
            <ProfileInfo
                profile={profile}
                status={status}
                updateStatus={updateStatus}
            />
            <MyPostsContainer/>
        </div>
    )
}


