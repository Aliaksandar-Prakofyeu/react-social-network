import React, {ChangeEvent} from 'react'
import {Pagination} from '@mui/material';
import {UnknownFunction} from "reselect/es/types";

type PropsType ={
    totalItemsCount: number
    pageSize: number
    onPageChanged: (p: number) => void
}

const Paginator: React.FC<PropsType> = ({totalItemsCount, pageSize, onPageChanged}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize)

    const handleChange= (event:  React.ChangeEvent<unknown> ,page: number) => {
        onPageChanged(page)
    }

    return (
        <Pagination count={pagesCount}  onChange={handleChange} showFirstButton showLastButton/>
    )
}


export default Paginator