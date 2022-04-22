import Dialogs from "./Dialogs";
import React from "react";
import {addMessageActionCreator} from "../../redux/dialogsReducer";
import {updateNewMessageTextActionCreator} from "../../redux/dialogsReducer";


const DialogsContainer = (props) => {
    let state = props.store.getState()

    let addMessage = () => {
        props.store.dispatch(addMessageActionCreator())
    };

    let onMessageChange = (text) => {
        let action = updateNewMessageTextActionCreator(text)
        props.store.dispatch(action)
    }

    return ( <Dialogs
            addMessage={addMessage}
            onMessageChange={onMessageChange}
            newMessageText={state.dialogsPage.newMessageText}
            dialogs={state.dialogsPage.dialogs}
            messages={state.dialogsPage.messages}
        />

    )
}

export default DialogsContainer;