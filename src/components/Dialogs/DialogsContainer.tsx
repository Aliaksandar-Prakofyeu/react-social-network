import Dialogs from './Dialogs'
import {addMessageActionCreator} from '../../redux/dialogsReducer'
import {connect} from 'react-redux'
import {withAuthRedirect} from '../hoc/withAuthRedirect'
import {compose} from 'redux'
import {DialogItemType, MessageType} from '../../Types/types'
import {AppStateType} from '../../redux/reduxStore'


type MapStateType = {
    dialogs: Array<DialogItemType>
    messages: Array<MessageType>
    newMessageText: string
}

type MapDispatchType = {
    addMessage: (newMessageText: string) => void
}

type OwnPropsType = {
    pageTitle: string
}



let mapStateToProps = (state: AppStateType) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        newMessageText: state.dialogsPage.newMessageText
    }
}

let mapDispatchToProps = (dispatch: any) => {
    return {
        addMessage: (newMessageText: string) => (dispatch(addMessageActionCreator(newMessageText))),
    }
}


// @ts-ignore
export default compose(connect<MapStateType, MapDispatchType,OwnPropsType, AppStateType>(mapStateToProps, mapDispatchToProps), withAuthRedirect)(Dialogs)