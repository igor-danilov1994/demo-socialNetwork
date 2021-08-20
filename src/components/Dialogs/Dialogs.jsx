import React from "react";
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../Common/FormsControl/FormsControl";
import {maxlengthCreator, required} from "../../utils/validators/validation";


const Dialogs = ({dialogsPage,sendMessage})  => {

    const dialogsElement = dialogsPage.dialogs
        .map(d => <DialogItem name={d.name} key={d.id} id={d.id} avatar={d.avatar}/>);

    const messagesElements = dialogsPage.messages
        .map(m => <Message key={m.id} message={m.message}/>);


    const addNewMessage = (values) => {
        sendMessage(values.newMessageBody);
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

const AddMassageForm = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
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