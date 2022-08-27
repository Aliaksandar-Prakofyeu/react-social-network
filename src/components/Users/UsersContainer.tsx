import {connect} from 'react-redux'
import {follow, getUsersData, unfollow, FilterType} from '../../redux/usersReducer'
import React from 'react'
import Users from './Users'
import Preloader from '../common/Preloader/Preloader'
import {compose} from 'redux'
import {
    getCurrentPage, getFilter,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers,
} from '../../redux/usersSelectors'
import {UserType} from '../../Types/types'
import {AppStateType} from '../../redux/reduxStore'
import {Box} from '@mui/material'


type MapStatePropsType = {
    currentPage: any
    pageSize: number
    isFetching: boolean
    users: Array<UserType>
    totalUsersCount: number
    followingInProgress: Array<number>
    filter: FilterType
}

type MapDispatchPropsType = {
    getUsersData: (currentPage: number, pageSize: number, filter: FilterType) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType


class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        const {currentPage, pageSize, filter} = this.props
        this.props.getUsersData(currentPage, pageSize, filter)
    }

    onPageChanged = (currentPage: number) => {
        const {pageSize, filter} = this.props
        this.props.getUsersData(currentPage, pageSize, filter)
    }

    onFilterChanged = (filter: FilterType) => {
        const {pageSize} = this.props
        this.props.getUsersData(1, pageSize, filter)
    }

    render() {
        return <Box>
            {this.props.isFetching ? <Preloader/> : null}
            <Users
                pageSize={this.props.pageSize}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                totalUsersCount={this.props.totalUsersCount}
                onPageChanged={this.onPageChanged}
                onFilterChanged={this.onFilterChanged}
                followingInProgress={this.props.followingInProgress}
            />
        </Box>
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        filter: getFilter(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),

    }
}


export default compose(connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    getUsersData, follow, unfollow
}))(UsersContainer)