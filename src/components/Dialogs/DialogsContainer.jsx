import Dialogs from "./Dialogs";
import React from "react";
import {addMessageActionCreator} from "../../redux/dialogsReducer";
import {updateNewMessageTextActionCreator} from "../../redux/dialogsReducer";
import StoreContext from "../../StoreContext";


const DialogsContainer = () => {
    // let state = props.store.getState()
    return (
        <StoreContext.Consumer>{
            (store) => {
                let state = store.getState();
                let addMessage = () => {
                    store.dispatch(addMessageActionCreator())
                };

                let onMessageChange = (text) => {
                    let action = updateNewMessageTextActionCreator(text)
                    store.dispatch(action)
                };
                return <Dialogs
                    addMessage={addMessage}
                    onMessageChange={onMessageChange}
                    newMessageText={state.dialogsPage.newMessageText}
                    dialogs={state.dialogsPage.dialogs}
                    messages={state.dialogsPage.messages}
                />
            }
        }
        </StoreContext.Consumer>

    )
}

export default DialogsContainer;