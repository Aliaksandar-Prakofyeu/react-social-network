import React from "react";
import {Pagination} from "@mui/material";

const Paginator = ({totalItemsCount, pageSize, onPageChanged}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    const handleChange = (e, p) => {
        onPageChanged(p)
    }

    return (
        <Pagination count={pagesCount} onChange={handleChange} showFirstButton showLastButton/>
    )
}


export default Paginator;