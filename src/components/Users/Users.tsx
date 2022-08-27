import React from 'react'
import Paginator from '../Paginator/Paginator'
import User from './User'
import {UserType} from '../../Types/types'
import SearchBar from '../SearchBar/SearchBar'
import {Box, Stack} from '@mui/material'
import {FilterType} from '../../redux/usersReducer'

type PropsType = {
    totalUsersCount: number
    pageSize: number
    onPageChanged: (p: number) => void
    onFilterChanged: (f: FilterType) => void
    users: Array<UserType>
    followingInProgress: Array<number>
    follow: (id: number) => void
    unfollow: (id: number) => void
}

const Users: React.FC<PropsType> = ({totalUsersCount, pageSize, onPageChanged, onFilterChanged , users, ...props}) => {
    return <Stack direction={'column'} spacing={2}>
        <SearchBar onFilterChanged={onFilterChanged}/>
        <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize}
                   onPageChanged={onPageChanged}/>
        <Box>
            {users.map(u => <User user={u}
                                 followingInProgress={props.followingInProgress}
                                 follow={props.follow}
                                 unfollow={props.unfollow} key={u.id}/>
            )}
        </Box>
    </Stack>
}

export default Users