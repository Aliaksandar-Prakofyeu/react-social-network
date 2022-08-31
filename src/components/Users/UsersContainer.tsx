import {useSelector} from 'react-redux'
import React from 'react'
import Users from './Users'
import Preloader from '../common/Preloader/Preloader'
import {getIsFetching,} from '../../redux/usersSelectors'
import {Box} from '@mui/material'


 const UsersContainer: React.FC = () => {

    const isFetching = useSelector(getIsFetching)

    return <Box>
        {isFetching ? <Preloader/> : null}
        <Users/>
    </Box>
}


export default UsersContainer