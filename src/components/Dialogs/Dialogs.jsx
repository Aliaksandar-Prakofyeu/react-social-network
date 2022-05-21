import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import React from "react";
import {Field, reduxForm} from "redux-form";
import {FormControl} from "../common/FormControls/FormControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";

const maxLength140 = maxLengthCreator(140)

const NewMessageForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field placeholder={'Enter your message'} name={'newMessageText'} fieldType={'textarea'} component={FormControl} validate={[required, maxLength140]}/>
        </div>
        <button>Send message</button>
    </form>
}

const NewMessageReduxForm = reduxForm({form: 'newMessage'})(NewMessageForm)

const Dialogs = (props) => {

    let dialogsElements = props.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>);

    let messagesElements = props.messages.map(m => <Message message={m.message} key={m.id}/>);

    const addNewMessage = (newMessageData) => {
        props.addMessage(newMessageData.newMessageText)
        newMessageData.newMessageText= ''
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <NewMessageReduxForm onSubmit={addNewMessage}/>
            </div>
        </div>

    )
}

export default Dialogs;