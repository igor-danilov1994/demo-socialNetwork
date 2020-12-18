import React from "react";
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../FormsControl/FormsControl";
import {maxlengthCreator, required} from "../../utils/validators/validation";


const Dialogs = (props) => {
    let state = props.dialogsPage;

    let dialogsElement = state.dialogs
        .map(d => <DialogItem name={d.name} key={d.id} id={d.id} avatar={d.avatar}/>);

    let messagesElements = state.messages
        .map(m => <Message key={m.id} message={m.message}/>);


    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody);
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

const AddMassageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
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