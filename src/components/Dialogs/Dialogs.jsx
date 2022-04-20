import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import React from "react";
import {addMessageActionCreator} from "../../redux/dialogsReducer";
import {updateNewMessageTextActionCreator} from "../../redux/dialogsReducer";


const Dialogs = (props) => {

    let dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>);

    let messagesElements = props.dialogsPage.messages.map(m => <Message message={m.message}/>);

    let addMessage = () => {
        props.dispatch(addMessageActionCreator())
    };

    let onMessageChange = (e) => {
        let text = e.target.value;
        let action = updateNewMessageTextActionCreator(text)
        props.dispatch(action)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div>
                    <textarea placeholder={'Enter your message'}  onChange={onMessageChange}
                              value={props.dialogsPage.newMessageText}/>
                </div>
                <button onClick={addMessage}>Send message</button>
            </div>
        </div>

    )
}

export default Dialogs;