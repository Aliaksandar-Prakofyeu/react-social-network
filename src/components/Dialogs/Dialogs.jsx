import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import React from "react";


const Dialogs = (props) => {

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
                <div>
                    <textarea placeholder={'Enter your message'}  onChange={onMessageChange}
                              value={props.newMessageText}/>
                </div>
                <button onClick={onAddMessage}>Send message</button>
            </div>
        </div>

    )
}

export default Dialogs;