import React from "react";
import Paginator from "../Paginator/Paginator";
import User from "./User";


const Users = ({totalUsersCount, pageSize, currentPage, onPageChanged, ...props}) => {
    return <div>
        <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage}
                   onPageChanged={onPageChanged}/>
        <div>{
            props.users.map(u => <User user={u}
                                       followingInProgress={props.followingInProgress}
                                       follow={props.follow}
                                       unfollow={props.unfollow} key={u.id}/>
            )
        }</div>
    </div>
}

export default Users;