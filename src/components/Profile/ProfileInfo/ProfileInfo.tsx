import Preloader from "../../common/Preloader/Preloader";
import userPhoto from "../../../assets/images/avatarPlaceholder.png";
import ProfileStatusWithHooks from "./ProfileStatus/ProfileStatusWithHooks";
import React, {ChangeEvent, useState} from "react";
import ProfileDataForm from "./ProfileData/ProfileDataForm";
import ProfileData from "./ProfileData/ProfileData";
import {Avatar, Box, IconButton, Stack, Typography} from "@mui/material";
import {ProfileInfoType, ProfileType} from "../../../Types/types";





const ProfileInfo: React.FC<ProfileInfoType> = ({isOwner, profile, status, updateStatus, updatePhoto, updateProfile}) => {

    let [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e:  ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            updatePhoto(e.target.files[0])
        }
    }
    const handleSubmit = (formData: ProfileType, setStatus: any, setSubmitting: any, goToViewMode: any) => {

        updateProfile(formData, setStatus, setSubmitting, goToViewMode);

    }
    return (
        <Box>
            <Stack direction={"row"} spacing={2} alignItems={"center"} sx={{marginTop: "20px", marginBottom: "20px"}}>
                {isOwner ? <IconButton  sx={{flex: 2,width:"150px"}} color="primary" aria-label="upload picture" component="label">
                    <input hidden type={"file"} onChange={onMainPhotoSelected}/>
                    <Avatar  src={profile.photos.large != null ? profile.photos.large : userPhoto}
                            alt={'Avatar'}
                            sx={{width:"150px", height:"150px"}}/>
                </IconButton> : <Avatar  src={profile.photos.large != null ? profile.photos.large : userPhoto}
                    alt={'Avatar'}
                    sx={{flex: 2,width:"150px", height:"150px"}}/>}

                <Stack direction={"column"} flex={4} spacing={1} alignItems={"left"}>
                    <Typography variant={"h6"}>{profile.fullName}</Typography>
                    <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                </Stack>
            </Stack>
            {editMode ?
                <ProfileDataForm profile={profile} handleSubmit={handleSubmit} editMode={editMode} goToViewMode={() => {
                    setEditMode(false)
                }}/> :
                <ProfileData profile={profile} goToEditMode={() => {
                    setEditMode(true)
                }} isOwner={isOwner}/>}
        </Box>
    )
};


export default ProfileInfo;