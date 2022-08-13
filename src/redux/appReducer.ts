import {getAuth} from "./authReducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./reduxStore";

const INITIALIZE_SUCCESS = 'react-social-network/app/INITIALIZE-SUCCESS'

export type InitialStateType = {
    initialized : boolean
}

let initialState: InitialStateType = {
    initialized: false
}

type ActionsType = InitializeSuccessActionType

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case INITIALIZE_SUCCESS:
            return {...state, initialized: true}
        default:
            return state
    }
}

type InitializeSuccessActionType = {
    type: typeof INITIALIZE_SUCCESS
}

export const initialized = (): InitializeSuccessActionType => ({type: INITIALIZE_SUCCESS})

type ThunkType = ThunkAction<Promise<void>, AppStateType, any, ActionsType>


export const initializeApp = (): ThunkType => async (dispatch) => {
    const promise = dispatch(getAuth())
    Promise.all([promise]).then(() => dispatch(initialized()))
}



export default appReducer;