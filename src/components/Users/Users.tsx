import React from "react";
import Paginator from "../Paginator/Paginator";
import User from "./User";
import {UserType} from "../../Types/types";

type PropsType = {
    totalUsersCount: number
    pageSize: number
    onPageChanged: (p: number) => void
    users: Array<UserType>
    followingInProgress: Array<number>
    follow: (id: number) => void
    unfollow: (id: number) => void
}

const Users: React.FC<PropsType> = ({totalUsersCount, pageSize, onPageChanged, users, ...props}) => {
    return <div>
        <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize}
                   onPageChanged={onPageChanged}/>
        <div>{
            users.map(u => <User user={u}
                                       followingInProgress={props.followingInProgress}
                                       follow={props.follow}
                                       unfollow={props.unfollow} key={u.id}/>
            )
        }</div>
    </div>
}

export default Users;