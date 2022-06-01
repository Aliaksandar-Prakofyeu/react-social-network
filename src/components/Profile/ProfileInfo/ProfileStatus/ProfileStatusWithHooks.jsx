import React, {useEffect, useState} from "react";

const ProfileStatusWithHooks = (props) => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)
    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
            setEditMode(true)
    }

    const onStatusChange = (e) =>{
        setStatus(e.currentTarget.value)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }
    return (
        <div>
            {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>{props.status || '---'}</span>
                </div>
            }
            {editMode  &&
                <div>
                    <input onChange={onStatusChange} onBlur={deactivateEditMode} autoFocus={true} value={status}/>
                </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks;