import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/helpers/objectHelpers";
import {Dispatch} from "redux";
import {AppStateType} from "./reduxStore";
import {ThunkAction} from "redux-thunk";
import {UserType} from "../Types/types";


const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const TOGGLE_FOLLOWING_IN_PROGRESS = 'TOGGLE-FOLLOWING-IN-PROGRESS';

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 20,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, // array of userId
}

type InitialStateType = typeof initialState

type ActionsType = AcceptFollowType | AcceptUnFollowType | SetUsersType | SetCurrentPageType |
    SetTotalUsersCountType | ToggleIsFetchingType | ToggleFollowingInProgressType

const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state, // users: [...state.users] one of ways of copying arrays
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            }
        }
        case UNFOLLOW: {
            return {
                ...state, // users: [...state.users] one of ways of copying arrays
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            }
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.count}
        }

        case SET_USERS: {
            return {...state, users: action.users}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_FOLLOWING_IN_PROGRESS: {
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
};

type AcceptFollowType = {
    type: typeof FOLLOW
    userId: number
}

export const acceptFollow = (userId: number): AcceptFollowType => ({type: FOLLOW, userId})

type AcceptUnFollowType = {
    type: typeof UNFOLLOW
    userId: number
}

export const acceptUnfollow = (userId: number): AcceptUnFollowType => ({type: UNFOLLOW, userId})

type SetUsersType = {
    type: typeof SET_USERS
    users: Array<UserType>
}

export const setUsers = (users: Array<UserType>): SetUsersType => ({type: SET_USERS, users})

export type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}

export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({type: SET_CURRENT_PAGE, currentPage} as const)

type SetTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS_COUNT
    count: number
}

export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountType => ({
    type: SET_TOTAL_USERS_COUNT,
    count: totalUsersCount
})

type ToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}

export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => ({type: TOGGLE_IS_FETCHING, isFetching})

type ToggleFollowingInProgressType = {
    type: typeof TOGGLE_FOLLOWING_IN_PROGRESS
    followingInProgress: boolean
    userId: number
}

export const toggleFollowingInProgress = (followingInProgress: boolean, userId: number): ToggleFollowingInProgressType => ({
    type: TOGGLE_FOLLOWING_IN_PROGRESS,
    followingInProgress,
    userId
})


type DispatchType = Dispatch<ActionsType>

export type ThunkType = ThunkAction<Promise<void>, AppStateType, any, ActionsType>

export const getUsersData = (currentPage: number, pageSize: number): ThunkType=> {
    return async (dispatch, getState) => {

        dispatch(toggleIsFetching(true))

        dispatch(setCurrentPage(currentPage))

        const data = await usersAPI.getUsers(currentPage, pageSize)

        dispatch(toggleIsFetching(false))

        dispatch(setUsers(data.items))

        dispatch(setTotalUsersCount(data.totalCount))
    }
}

const _followUnfollowFlow = async (dispatch: DispatchType,
                                   userId: number, apiMethod: any,
                                   actionCreator: (userId: number) => AcceptFollowType | AcceptUnFollowType) => {
    dispatch(toggleFollowingInProgress(true, userId));
    const data = await apiMethod(userId);
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingInProgress(false, userId));
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), acceptUnfollow);
    }
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), acceptFollow);
    }
}

export default usersReducer
