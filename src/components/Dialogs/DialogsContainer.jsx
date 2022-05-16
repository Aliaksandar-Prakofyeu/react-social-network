import Dialogs from "./Dialogs";
import React from "react";
import {addMessageActionCreator} from "../../redux/dialogsReducer";
import {updateNewMessageTextActionCreator} from "../../redux/dialogsReducer";
import {connect} from "react-redux";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";

let mapStateToProps = (state) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        newMessageText: state.dialogsPage.newMessageText
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        addMessage: () => (dispatch(addMessageActionCreator())),
        onMessageChange: (text) => (dispatch(updateNewMessageTextActionCreator(text)))
    }
};


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect)
(Dialogs);