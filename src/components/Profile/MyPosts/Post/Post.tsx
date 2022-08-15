// @ts-ignore
import userPhoto from '../../../../assets/images/avatarPlaceholder.png'
import {Avatar, IconButton, Stack, Typography} from '@mui/material'
import React from 'react'
import {ThumbDownAlt, ThumbUp} from '@mui/icons-material'
import {PostType} from '../../../../Types/types'



const Post: React.FC<PostType> = (props) => {
    return (
        <Stack direction={'row'} spacing={2}
               sx={{border: 'solid 1px grey', borderRadius: '5px', padding: '10px', margin: '10px'}}>
            <Avatar sx={{width: '100px', height: '100px'}} src={userPhoto}/>
            <Stack direction={'column'} spacing={1}>
                <Typography flex={3}>{props.message}</Typography>
                <Stack alignItems={'center'} flex={1} direction={'row'} spacing={1}>
                    <IconButton>
                        <ThumbUp/>
                    </IconButton>
                    <Typography>60</Typography>
                    <IconButton>
                        <ThumbDownAlt/>
                    </IconButton>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default Post