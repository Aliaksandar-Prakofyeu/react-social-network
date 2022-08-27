import {updateObjectInArray} from '../utils/helpers/objectHelpers'
import {Dispatch} from 'redux'
import {BaseThunkType, InferActionsTypes} from './reduxStore'
import {UserType} from '../Types/types'
import {usersAPI} from '../api/usersAPI'
import {ApiResponseType, ResultCodesEnum} from '../api/apiTypes'


let initialState = {
    users: [] as Array<UserType>,
    pageSize: 20,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, // array of userId
    filter: {
        term: '',
        friend: null as null | boolean
    }
}

export type InitialState = typeof initialState

export type FilterType = typeof initialState.filter


const usersReducer = (state = initialState, action: ActionTypes): InitialState => {
    switch (action.type) {
        case 'RSN/USERS/FOLLOW': {
            return {
                ...state, // users: [...state.users] one of ways of copying arrays
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            }
        }
        case 'RSN/USERS/UNFOLLOW': {
            return {
                ...state, // users: [...state.users] one of ways of copying arrays
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            }
        }
        case 'RSN/USERS/SET_TOTAL_USERS_COUNT': {
            return {...state, totalUsersCount: action.count}
        }

        case 'RSN/USERS/SET_USERS': {
            return {...state, users: action.users}
        }
        case 'RSN/USERS/SET_CURRENT_PAGE': {
            return {...state, currentPage: action.currentPage}
        }
        case 'RSN/USERS/TOGGLE_IS_FETCHING': {
            return {...state, isFetching: action.isFetching}
        }
        case 'RSN/USERS/SET_FILTER': {
            return {...state, filter: action.payload}
        }
        case 'RSN/USERS/TOGGLE_FOLLOWING_IN_PROGRESS': {
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

export const actions = {
    acceptFollow: (userId: number) => ({type: 'RSN/USERS/FOLLOW', userId} as const),

    acceptUnfollow: (userId: number) => ({type: 'RSN/USERS/UNFOLLOW', userId} as const),

    setUsers: (users: Array<UserType>) => ({type: 'RSN/USERS/SET_USERS', users} as const),

    setCurrentPage: (currentPage: number) => ({type: 'RSN/USERS/SET_CURRENT_PAGE', currentPage} as const),

    setTotalUsersCount: (totalUsersCount: number) => ({
        type: 'RSN/USERS/SET_TOTAL_USERS_COUNT',
        count: totalUsersCount
    } as const),

    setFilter: (filter: FilterType) => ({type: 'RSN/USERS/SET_FILTER' , payload: filter} as const),

    toggleIsFetching: (isFetching: boolean) => ({type: 'RSN/USERS/TOGGLE_IS_FETCHING', isFetching} as const),

    toggleFollowingInProgress: (followingInProgress: boolean, userId: number) => ({
        type: 'RSN/USERS/TOGGLE_FOLLOWING_IN_PROGRESS',
        followingInProgress,
        userId
    } as const),
}


type DispatchType = Dispatch<ActionTypes>

type ThunkType = BaseThunkType<ActionTypes>

export const getUsersData = (currentPage: number, pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch) => {

        dispatch(actions.toggleIsFetching(true))

        dispatch(actions.setCurrentPage(currentPage))

        dispatch(actions.setFilter(filter))

        const data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)

        dispatch(actions.toggleIsFetching(false))

        dispatch(actions.setUsers(data.items))

        dispatch(actions.setTotalUsersCount(data.totalCount))
    }
}

const _followUnfollowFlow = async (dispatch: DispatchType,
                                   userId: number, apiMethod: (userId: number) => Promise<ApiResponseType>,
                                   actionCreator: (userId: number) => ActionTypes) => {
    dispatch(actions.toggleFollowingInProgress(true, userId))
    const data = await apiMethod(userId)
    if (data.resultCode === ResultCodesEnum.Success) {
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
