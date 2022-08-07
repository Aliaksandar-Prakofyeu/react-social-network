import {createStore, compose, applyMiddleware, combineReducers} from 'redux'
import profileReducer from './profileReducer'
import dialogsReducer from './dialogsReducer'
import sidebarReducer from './sidebarReducer'
import usersReducer from './usersReducer'
import thunkMiddleware from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import authReducer from './authReducer'
import appReducer from './appReducer'

type RootReducerType = typeof rootReducer// (globalState: AppStateType) => AppStateType

export type AppStateType = ReturnType<RootReducerType>

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})



// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

/*let store = createStore(reducers, applyMiddleware(thunkMiddleware));*/
// @ts-ignore
window._store_ = store

export default store