import {getAuth} from "./authReducer";

const INITIALIZE_SUCCESS = 'react-social-network/app/INITIALIZE-SUCCESS'

export type InitialStateType = {
    initialized : boolean
}

let initialState: InitialStateType = {
    initialized: false
}

const appReducer = (state = initialState, action: any): InitialStateType => {
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

export const initializeApp = () => (dispatch: any) => {
    const promise = dispatch(getAuth())
    Promise.all([promise]).then(() => dispatch(initialized()))
}



export default appReducer;