import React from 'react'
import {Pagination} from '@mui/material';

type PropsType ={
    totalItemsCount: number
    pageSize: number
    onPageChanged: (p: number) => void
}

const Paginator: React.FC<PropsType> = ({totalItemsCount, pageSize, onPageChanged}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize)

    const handleChange= (p: any) => {
        onPageChanged(p)
    }

    return (
        <Pagination count={pagesCount} onChange={handleChange} showFirstButton showLastButton/>
    )
}


export default Paginator