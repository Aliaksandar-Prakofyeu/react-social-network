import React, {useEffect} from 'react'
import Paginator from '../Paginator/Paginator'
import User from './User'
import SearchBar from '../SearchBar/SearchBar'
import {Box, Stack} from '@mui/material'
import {FilterType, getUsersData} from '../../redux/usersReducer'
import {useDispatch, useSelector} from 'react-redux'
import {
    getCurrentPage,
    getFilter,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from '../../redux/usersSelectors'

const Users: React.FC = () => {

    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getFilter)
    const currentPage = useSelector(getCurrentPage)
    const followingInProgress = useSelector(getFollowingInProgress)


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsersData(currentPage, pageSize, filter))
    }, [currentPage, dispatch, filter, pageSize])

    const onPageChanged = (currentPage: number) => {
        dispatch(getUsersData(currentPage, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsersData(1, pageSize, filter))
    }

    const follow = (id: number) => {
        dispatch(follow(id))
    }

    const unfollow = (id: number) => {
        dispatch(unfollow(id))
    }

    return <Stack direction={'column'} spacing={2}>
        <SearchBar onFilterChanged={onFilterChanged}/>
        <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize}
                   onPageChanged={onPageChanged}/>
        <Box>
            {users.map(u => <User user={u}
                                  followingInProgress={followingInProgress}
                                  follow={follow}
                                  unfollow={unfollow} key={u.id}/>
            )}
        </Box>
    </Stack>
}

export default Users