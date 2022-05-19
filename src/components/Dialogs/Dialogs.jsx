import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import React from "react";
import {Field, reduxForm} from "redux-form";

const NewMessageForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field placeholder={'Enter your message'} name={'newMessageText'} component={'textarea'}/>
        </div>
        <button>Send message</button>
    </form>
}

const NewMessageReduxForm = reduxForm({form: 'newMessage'})(NewMessageForm)

const Dialogs = (props) => {
    const onSubmit = (formData) => {
        console.log(formData);
    }

    let dialogsElements = props.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>);

    let messagesElements = props.messages.map(m => <Message message={m.message} key={m.id}/>);

    let onAddMessage = () => {
        props.addMessage()
    };

    let onMessageChange = (e) => {
        let text = e.target.value;
        props.onMessageChange(text)

    }


    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <NewMessageReduxForm onSubmit={onSubmit}/>
            </div>
        </div>

    )
}

export default Dialogs;