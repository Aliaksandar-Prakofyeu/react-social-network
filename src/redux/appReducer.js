import {getAuth} from "./authReducer";

const INITIALIZE_SUCCESS = 'react-social-network/app/INITIALIZE-SUCCESS'

let initialState = {
    initialized: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZE_SUCCESS:
            return {...state, initialized: true}
        default:
            return state
    }
}

export const initialized = () => ({type: INITIALIZE_SUCCESS})

export const initializeApp = () => (dispatch) => {
    const promise = dispatch(getAuth())
    Promise.all([promise]).then(() => dispatch(initialized()))
}



export default appReducer;