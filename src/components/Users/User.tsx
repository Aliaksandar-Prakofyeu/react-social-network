import React from 'react'
// @ts-ignore
import userPhoto from '../../assets/images/avatarPlaceholder.png'
import {Avatar, Box, Button, Divider, IconButton, Stack, Typography} from '@mui/material'
import {UserType} from '../../Types/types'

type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    follow: (id: number) => void
    unfollow: (id: number) => void
}

const User: React.FC<PropsType> = React.memo(({user, followingInProgress, unfollow, follow}) => {
    return (

        <Box>
            <Stack direction={'row'} spacing={2} alignItems="center">
                <IconButton href={'/react-social-network/#/profile/' + user.id}>
                    <Avatar sx={{width: '100px', height: '100px'}}
                            src={user.photos.small != null ? user.photos.small : userPhoto}/>
                </IconButton>

                <Stack direction={'column'} spacing={1}>
                    <Typography>{user.name}</Typography>
                    <Typography>{user.status}</Typography>
                    <Box>
                        {user.followed
                            ? <Button variant={'contained'} disabled={followingInProgress.some(id => id === user.id)}
                                      onClick={() => {
                                          unfollow(user.id)
                                      }}>Unfollow</Button>
                            : <Button variant={'contained'} disabled={followingInProgress.some(id => id === user.id)}
                                      onClick={() => {
                                          follow(user.id)
                                      }}>Follow</Button>}
                    </Box>
                </Stack>
            </Stack>
            <Divider variant="middle"/>
        </Box>
    )
})

export default User