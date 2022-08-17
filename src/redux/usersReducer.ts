import {usersAPI} from '../api/api'
import {updateObjectInArray} from '../utils/helpers/objectHelpers'
import {Dispatch} from 'redux'
import {AppStateType, InferActionsTypes} from './reduxStore'
import {ThunkAction} from 'redux-thunk'
import {UserType} from '../Types/types'




let initialState = {
    users: [] as Array<UserType>,
    pageSize: 20,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, // array of userId
}

type InitialStateType = typeof initialState



const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'FOLLOW': {
            return {
                ...state, // users: [...state.users] one of ways of copying arrays
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            }
        }
        case 'UNFOLLOW': {
            return {
                ...state, // users: [...state.users] one of ways of copying arrays
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            }
        }
        case 'SET_TOTAL_USERS_COUNT': {
            return {...state, totalUsersCount: action.count}
        }

        case 'SET_USERS': {
            return {...state, users: action.users}
        }
        case 'SET_CURRENT_PAGE': {
            return {...state, currentPage: action.currentPage}
        }
        case 'TOGGLE_IS_FETCHING': {
            return {...state, isFetching: action.isFetching}
        }
        case 'TOGGLE_FOLLOWING_IN_PROGRESS': {
            return {
                ...state,
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : [...state.followingInProgress.filter(id => id !== action.userId)]
            }
        }
        default:
            return state
    }
}

type ActionTypes = InferActionsTypes<typeof actions>

export const actions ={
    acceptFollow: (userId: number)=> ({type: 'FOLLOW', userId} as const),

    acceptUnfollow: (userId: number)=> ({type: 'UNFOLLOW', userId} as const),

    setUsers: (users: Array<UserType>)=> ({type: 'SET_USERS', users} as const),

    setCurrentPage: (currentPage: number)=> ({type: 'SET_CURRENT_PAGE', currentPage} as const),

    setTotalUsersCount: (totalUsersCount: number)=> ({
        type: 'SET_TOTAL_USERS_COUNT',
        count: totalUsersCount
    } as const),

    toggleIsFetching: (isFetching: boolean)=> ({type: 'TOGGLE_IS_FETCHING', isFetching} as const),

    toggleFollowingInProgress: (followingInProgress: boolean, userId: number)=> ({
        type: 'TOGGLE_FOLLOWING_IN_PROGRESS',
        followingInProgress,
        userId
    } as const),
}




type DispatchType = Dispatch<ActionTypes>

export type ThunkType = ThunkAction<Promise<void>, AppStateType, any, ActionTypes>

export const getUsersData = (currentPage: number, pageSize: number): ThunkType=> {
    return async (dispatch) => {

        dispatch(actions.toggleIsFetching(true))

        dispatch(actions.setCurrentPage(currentPage))

        const data = await usersAPI.getUsers(currentPage, pageSize)

        dispatch(actions.toggleIsFetching(false))

        dispatch(actions.setUsers(data.items))

        dispatch(actions.setTotalUsersCount(data.totalCount))
    }
}

const _followUnfollowFlow = async (dispatch: DispatchType,
                                   userId: number, apiMethod: any,
                                   actionCreator: (userId: number) => ActionTypes) => {
    dispatch(actions.toggleFollowingInProgress(true, userId))
    const data = await apiMethod(userId)
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleFollowingInProgress(false, userId))
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.acceptUnfollow)
    }
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.acceptFollow)
    }
}

export default usersReducer
