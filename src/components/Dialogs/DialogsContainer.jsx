import Dialogs from "./Dialogs";
import React from "react";
import {addMessageActionCreator} from "../../redux/dialogsReducer";
import {updateNewMessageTextActionCreator} from "../../redux/dialogsReducer";
import {connect} from "react-redux";
import {withAuthRedirect} from "../hoc/withAuthRedirect";

let mapStateToProps = (state) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        newMessageText: state.dialogsPage.newMessageText
    }
};
let AuthRedirectComponent = withAuthRedirect(Dialogs)

let mapDispatchToProps = (dispatch) => {
    return {
        addMessage: () => (dispatch(addMessageActionCreator())),
        onMessageChange: (text) => (dispatch(updateNewMessageTextActionCreator(text)))
    }
};

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);

export default DialogsContainer;