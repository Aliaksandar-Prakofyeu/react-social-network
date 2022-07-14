
import React from "react";
import {Card, Typography} from "@mui/material";

const Message = (props) => {
    return<Typography  sx={{padding:"10px"}}>{props.message}</Typography>
}


export default Message;