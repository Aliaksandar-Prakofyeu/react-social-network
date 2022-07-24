import userPhoto from "../../../assets/images/avatarPlaceholder.png";
import {Avatar, Box, Stack, Typography} from "@mui/material";

const DialogItem = (props) => {
    return (
        <Box padding={"5px"} margin={"5px"}>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
                <Avatar alt={props.name} src={userPhoto} flex={2}/>
                <Typography flex={4}>{props.name}</Typography>
            </Stack>
        </Box>

    );

}

export default DialogItem;