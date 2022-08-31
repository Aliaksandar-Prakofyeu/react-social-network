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
import {useSearchParams} from 'react-router-dom'

const Users: React.FC = () => {

    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getFilter)
    const currentPage = useSelector(getCurrentPage)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()

    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        const result: any = {}
        // @ts-ignore
        for (const [key, value] of searchParams.entries()) {
            let value2: any = +value
            if (isNaN(value2)) {
                value2 = value
            }
            if (value === 'true') {
                value2 = true
            } else if (value === 'false') {
                value2 = false
            }
            result[key] = value2
        }

        let actualPage = result.page || currentPage
        let term = result.term || filter.term
        let friend = result.friend || filter.friend

        if (result.friend === false) {
            friend = result.friend
        }

        const actualFilter = {friend, term}

        dispatch(getUsersData(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        const term = filter.term
        const friend = filter.friend

        let urlQuery =
            (term === '' ? '' : `&term=${term}`)
            + (friend === null ? '' : `&friend=${friend}`)
            + (currentPage === 1 ? '' : `&page=${currentPage}`)

        setSearchParams(urlQuery)
    }, [filter, currentPage])

    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsersData(pageNumber, pageSize, filter))
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