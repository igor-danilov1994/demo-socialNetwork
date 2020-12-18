import React from 'react';
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatusWithHooks from "../ProfileStatusWithHooks";

let ProfileInfo = ({profile, status, updateStatus}) => {
    if (!profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div>
                <img src={profile.photos.large} alt="photos"/>
                <ProfileStatusWithHooks
                    status={status}
                    updateStatus={updateStatus}
                />
            </div>
        </div>
    )
};


export default ProfileInfo;
