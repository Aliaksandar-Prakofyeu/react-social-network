import preloader from '../../../assets/images/preloader.svg';
import React from "react";
import {Box} from "@mui/material";


let Preloader = (props) => {
    return (
        <Box>
            <img src={preloader}/>
        </Box>
        )
}

export default Preloader