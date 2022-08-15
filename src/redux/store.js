import profileReducer from './profileReducer'
import dialogsReducer from './dialogsReducer'
import sidebarReducer from './sidebarReducer'

let store = {
    _state: {
        dialogsPage: {
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
            newMessageText: ''
        },
        profilePage: {
            posts: [
                {id: 1, message: 'Hi how are you?', likeCount: 10},
                {id: 2, message: 'It\'s my first post', likeCount: 20},
            ],
            newPostText: ''
        },
        sidebar: {},


    },
    _callSubscriber() {
        console.log('State changed')
    },

    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },

    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)
        this._callSubscriber(this._state)

    }
}





export default store
window.store = store