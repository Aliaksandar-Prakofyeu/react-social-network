import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import React from 'react'
import {ProfileInfoType} from '../../Types/types'
import {Stack} from "@mui/material";

const Profile: React.FC<ProfileInfoType>  = (props) => {

    return (
        <Stack direction={'column'} spacing={2}>
            <ProfileInfo updatePhoto={props.updatePhoto}  isOwner={props.isOwner} profile={props.profile}
                         status={props.status} updateStatus={props.updateStatus} updateProfile={props.updateProfile}/>
            <MyPostsContainer/>
        </Stack>
    )
}

export default Profile