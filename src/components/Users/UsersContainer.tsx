import {connect} from 'react-redux';
import {
    acceptFollow,
    acceptUnfollow,
    follow,
    getUsersData,
    setCurrentPage,
    toggleFollowingInProgress,
    unfollow
} from '../../redux/usersReducer';
import React from 'react';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import {compose} from 'redux';
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsers,
} from '../../redux/usersSelectors';
import {UserType} from '../../Types/types';
import {AppStateType} from '../../redux/reduxStore';
import {Typography} from '@mui/material';

type OwnPropsType = {
    pageTitle: string
}

type MapStatePropsType = {
    currentPage: any
    pageSize: number
    isFetching: boolean
    users: Array<UserType>
    totalUsersCount: number
    followingInProgress: Array<number>
}

type MapDispatchPropsType = {
    setCurrentPage: (currentPage: number) => void
    getUsersData: (currentPage: number, pageSize: number) => void
    follow: () => void
    unfollow: () => void
}

type PropsType = OwnPropsType & MapStatePropsType & MapDispatchPropsType


class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.getUsersData(currentPage, pageSize)
    }

    onPageChanged = (currentPage: number) => {
        const {pageSize} = this.props
        this.props.setCurrentPage(currentPage)
        this.props.getUsersData(currentPage, pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users
                pageSize={this.props.pageSize}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                totalUsersCount={this.props.totalUsersCount}
                onPageChanged={this.onPageChanged}
                followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
};



// @ts-ignore
export default compose(connect<MapStatePropsType, MapDispatchPropsType,OwnPropsType, AppStateType>(mapStateToProps, {setCurrentPage,  getUsersData, follow, unfollow
})(UsersContainer))