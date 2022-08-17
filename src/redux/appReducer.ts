import {getAuth} from './authReducer'
import {BaseThunkType, InferActionsTypes} from './reduxStore'


export type InitialStateType = {
    initialized : boolean
}

let initialState: InitialStateType = {
    initialized: false
}

type ActionTypes = InferActionsTypes<typeof actions>

const appReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'RSN/APP/INITIALIZE_SUCCESS':
            return {...state, initialized: true}
        default:
            return state
    }
}


export const actions = {
    initialized:() => ({type: 'RSN/APP/INITIALIZE_SUCCESS'} as const)
}

type ThunkType = BaseThunkType<ActionTypes>


export const initializeApp = (): ThunkType => async (dispatch) => {
    const promise = dispatch(getAuth())
    Promise.all([promise]).then(() => dispatch(actions.initialized()))
}



export default appReducer