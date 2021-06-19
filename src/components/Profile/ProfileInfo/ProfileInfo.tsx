import React from 'react';
import Preloader from "../../Common/Preloader/Preloader";
import {ProfileStatusWithHooks} from "../ProfileStatusWithHooks";
import {ProfilePropsType} from "../profile";

type ProfileInfoPropsType = ProfilePropsType

export const ProfileInfo: React.FC<ProfileInfoPropsType> = ({profile, status, updateStatus}) => {
    if (!profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div>
                <img src={profile.photos.large!} alt="photos"/>

                <ProfileStatusWithHooks
                    status={status}
                    updateStatus={updateStatus}
                />
            </div>
        </div>
    )
}
