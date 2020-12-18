import React from 'react';
import Preloader from "../../Preloader/Preloader";
import ProfileStatusWithHooks from "../ProfileStatusWithHooks";

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div>
                <img src={props.profile.photos.large} alt="photos"/>
                <ProfileStatusWithHooks
                    status={props.status}
                    updateStatus={props.updateStatus}
                />
            </div>
        </div>
    )
};


export default ProfileInfo;
