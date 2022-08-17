import {createStore, compose, applyMiddleware, combineReducers, Action} from 'redux'
import profileReducer from './profileReducer'
import dialogsReducer from './dialogsReducer'
import sidebarReducer from './sidebarReducer'
import usersReducer from './usersReducer'
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
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

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never

export type InferActionsTypes<T extends {[key: string]: (...args: any) => any}> =  ReturnType<PropertiesTypes<T>>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

/*let store = createStore(reducers, applyMiddleware(thunkMiddleware));*/
// @ts-ignore
window._store_ = store

export default store