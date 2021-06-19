import * as React from "react";
import {ChangeEvent} from "react";

type ProfileStatusWithHooksPropsType = {
    status: string
    updateStatus: (status: string) => void
}

export const ProfileStatusWithHooks: React.FC<ProfileStatusWithHooksPropsType> = ({status, updateStatus}) => {

    const [editMode, setEditMode] = React.useState(false);
    const [myStatus, setStatus] = React.useState(status);

    React.useEffect(() => {
        setStatus(status);
    }, [status]);

    const activateEditMode = () => {
        setEditMode(true);
    };

    const deActivateEditMode = () => {
        setEditMode(false);
        updateStatus(myStatus); //Отправка измененнокго статуса на сервер
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }


    return (
        <div>
            {!editMode &&
            <div>
                    <span onDoubleClick={activateEditMode}>
                        {status}
                    </span>
            </div>
            }


            {editMode &&
            <div>
                <input
                    autoFocus={true} onBlur={deActivateEditMode}
                    onChange={onStatusChange} value={myStatus}
                />
            </div>
            }
        </div>
    )
}