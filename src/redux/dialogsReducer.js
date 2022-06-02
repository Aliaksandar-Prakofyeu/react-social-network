const SEND_MESSAGE = 'react-social-network/dialogs/SEND-MESSAGE';

let initialState = {
    dialogs: [
        {id: 1, name: 'Alex'},
        {id: 2, name: 'Max'},
        {id: 3, name: 'Jake'},
        {id: 4, name: 'Selen'},
        {id: 5, name: 'Justin'},
    ],

    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How are you?'},
        {id: 3, message: 'I miss ya'},
        {id: 4, message: 'Good'},
        {id: 5, message: 'Bye'},
    ],
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE: {
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: action.newMessageText}],
            };
        }
        default:
            return state;
    }

};

export const addMessageActionCreator = (newMessageText) => ({type: SEND_MESSAGE, newMessageText})

export default dialogsReducer;