import React from "react";
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Field, reduxForm} from "redux-form";
import {createField, Input, Textarea} from "../Common/FormsControl/FormsControl";
import {maxlengthCreator, required} from "../../utils/validators/validation";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {actions} from "../../redux/dialogsReducer";


const Dialogs = () => {
    const dialogsPage = useSelector((state: AppStateType) => state.dialogsPage)
    const dispatch = useDispatch()


    const dialogsElement = dialogsPage.dialogs
        .map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>);

    const messagesElements = dialogsPage.messages
        .map(m => <Message key={m.id} message={m.message}/>);


    const addNewMessage = (values: { newMessageBody: string }) => {
        dispatch(actions.sendMessage(values.newMessageBody))
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElement}
            </div>

            <div className={s.messages}>
                {messagesElements}
                <AddMassageFormRedux
                    onSubmit={addNewMessage}
                />
            </div>

        </div>
    )
};
const maxLength50 = maxlengthCreator(50);

type DialogsFormValuesType = {
    type: string,
    name: 'newMessageBody',
}

type DialogsFormValuesTypeKeys = keyof DialogsFormValuesType

const AddMassageForm = ({handleSubmit} ) => {

    return (
        <form onSubmit={handleSubmit}>
            <div>
                {createField<DialogsFormValuesTypeKeys>("email", "newMessageBody", [required, maxLength50], Textarea, 'add you messages')}
                <Field component={Textarea} name="newMessageBody"
                       placeholder="add you messages" validate={[required, maxLength50]}/>
            </div>
            <div>
                <button>SEND</button>
            </div>
        </form>
    )
}

const AddMassageFormRedux = reduxForm({form: 'addDialogsMessages'})(AddMassageForm);

export default Dialogs;