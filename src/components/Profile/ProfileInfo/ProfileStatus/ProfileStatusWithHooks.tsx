import React, {ChangeEvent, useEffect, useState} from "react";
import {Box, TextField, Typography} from "@mui/material";

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)
    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
            setEditMode(true)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) =>{
        setStatus(e.currentTarget.value)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }
    return (
        <Box>
            {!editMode &&
                    <Typography sx={{cursor: "pointer"}}
                                variant="subtitle1"
                                onDoubleClick={activateEditMode}>{props.status || '---'}
                    </Typography>
            }
            {editMode  &&
                    <TextField
                        onChange={onStatusChange}
                        onBlur={deactivateEditMode}
                        autoFocus={true}
                        value={status}/>
            }
        </Box>
    )
}

export default ProfileStatusWithHooks;