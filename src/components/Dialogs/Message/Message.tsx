import React from "react";
import {Typography} from "@mui/material";
import {MessageType} from "../../../Types/types";

const Message: React.FC<MessageType> = (props) => {
    return<Typography  sx={{padding:"10px"}}>{props.message}</Typography>
}


export default Message;