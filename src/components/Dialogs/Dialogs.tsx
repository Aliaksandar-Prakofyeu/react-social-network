import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import React from 'react'
import NewMessageForm from './Message/NewMessageForm'
import {Box, Divider, Stack} from '@mui/material'
import {DialogItemType, MessageType, NewMessageDataType} from '../../Types/types'


type DialogsType = {
    pageTitle: string
    dialogs: Array<DialogItemType>
    messages: Array<MessageType>
    newMessageText: string
    d: DialogItemType
    m: MessageType
    addMessage: (newMessageText: string) => void
}

const Dialogs: React.FC<DialogsType> = (props) => {

    let dialogsElements = props.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>)

    let messagesElements = props.messages.map(m => <Message message={m.message} key={m.message}/>)

    const handleSubmit = (newMessageData: NewMessageDataType) => {
        props.addMessage(newMessageData.newMessageText)
        newMessageData.newMessageText = ''
    }

    return (
        <Stack sx={{paddingTop: '30px'}} direction={'row'} spacing={2}
               divider={<Divider orientation={'vertical'} flexItem/>} justifyContent={'left'}>
            <Box flex={1}>
                {dialogsElements}
            </Box>
            <Box flex={5}>
                <div>{messagesElements}</div>
                <NewMessageForm handleSubmit={handleSubmit}/>
            </Box>
        </Stack>

    )
}

export default Dialogs