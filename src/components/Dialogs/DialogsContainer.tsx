import Dialogs from './Dialogs'
import {actions} from '../../redux/dialogsReducer'
import {connect} from 'react-redux'
import {withAuthRedirect} from '../hoc/withAuthRedirect'
import {compose} from 'redux'
import {DialogItemType, MessageType} from '../../Types/types'
import {AppStateType} from '../../redux/reduxStore'
import React from "react";


type MapStateType = {
    dialogs: Array<DialogItemType>
    messages: Array<MessageType>
    newMessageText: string
}

type MapDispatchType = {
    addMessage: (newMessageText: string) => void
}

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        newMessageText: state.dialogsPage.newMessageText
    }
}


export default compose<React.ComponentType>(connect<MapStateType, MapDispatchType, {}, AppStateType>
    (mapStateToProps, {addMessage: actions.addMessage}),
    withAuthRedirect)(Dialogs)