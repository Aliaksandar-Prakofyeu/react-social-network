import preloader from '../../../assets/images/preloader.svg'
import React from 'react'
import {Box} from '@mui/material'


let Preloader = () => {
    return (
        <Box>
            <img alt='preloader' src={preloader}/>
        </Box>
        )
}

export default Preloader