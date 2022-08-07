import {Avatar, Box, Stack, Typography} from "@mui/material";
import {DialogItemType} from "../../../Types/types";
import React from "react";


const DialogItem: React.FC<DialogItemType> = (props) => {
    return (
        <Box padding={"5px"} margin={"5px"}>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
                <Box flex={2}>
                    <Avatar  alt={"Avatar"} src={"../../../assets/images/avatarPlaceholder.png"} />
                </Box>
                <Typography flex={4}>{props.name}</Typography>
            </Stack>
        </Box>

    );

}

export default DialogItem;