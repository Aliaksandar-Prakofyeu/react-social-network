
import userPhoto from "../../../assets/images/avatarPlaceholder.png";
import {Avatar, Box, Stack, Typography} from "@mui/material";

const DialogItem = (props) => {
    return (
        <Stack direction={"row"} spacing={2} alignItems={"center"} padding={"10px"}>
            <Avatar alt={props.name} src={userPhoto} flex={2}/>
            <Typography flex={4}>{props.name}</Typography>
        </Stack>
    );

}

export default DialogItem;