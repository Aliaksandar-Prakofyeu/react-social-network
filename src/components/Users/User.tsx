import React from "react";
// @ts-ignore
import userPhoto from "../../assets/images/avatarPlaceholder.png";
import {Avatar, Button, IconButton, Stack, Typography} from "@mui/material";
import {UserType} from "../../Types/types";

type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    follow: (id: number) => void
    unfollow: (id: number) => void
}

const User:  React.FC<PropsType> = ({user, followingInProgress, unfollow, follow}) => {
    return (
        <Stack direction={"row"} spacing={2} sx={{border:"solid 1px grey",borderRadius: "5px" , padding: "10px", margin:"10px"}}>

            <IconButton href={'/react-social-network/profile/' + user.id}>
                <Avatar sx={{width: "100px", height: "100px"}} src={user.photos.small != null ? user.photos.small : userPhoto}/>
            </IconButton>

            <Stack direction={"column"} spacing={1}>
                <Typography>{user.name}</Typography>
                <Typography>{user.status}</Typography>
                {user.followed
                    ? <Button variant={"contained"} disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                        unfollow(user.id)
                    }}>Unfollow</Button>
                    : <Button variant={"contained"} disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                        follow(user.id)
                    }}>Follow</Button>}
            </Stack>

        </Stack>)
}

export default User;