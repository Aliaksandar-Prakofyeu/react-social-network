import {connect} from "react-redux";
import {
    acceptFollow,
    acceptUnfollow,
    follow,
    getUsersData,
    setCurrentPage,
    toggleFollowingInProgress,
    unfollow
} from "../../redux/usersReducer";
import React from "react";
import Users from './Users';
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsers,
} from "../../redux/usersSelectors";

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.getUsersData(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (p) => {
        this.props.setCurrentPage(p)
        this.props.getUsersData(p, this.props.pageSize)
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
                currentPage={this.props.currentPage}
                followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
};

export default compose(connect(mapStateToProps, {
    acceptFollow, acceptUnfollow, setCurrentPage, toggleFollowingInProgress,  getUsersData, follow, unfollow
}),
    /*withAuthRedirect*/)
(UsersContainer)