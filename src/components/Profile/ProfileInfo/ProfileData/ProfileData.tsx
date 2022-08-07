import {Box, Button, Divider, Stack, Typography} from "@mui/material";
import {
    ConnectWithoutContact,
    Facebook,
    GitHub,
    Instagram,
    Link,
    Twitter,
    WebAsset,
    YouTube
} from "@mui/icons-material";
import {ContactsType, ProfileType} from "../../../../Types/types";
import React from "react";

type ProfileDataType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}

const ProfileData: React.FC<ProfileDataType> = ({profile, isOwner, goToEditMode}) => {
    return (
        <Box>
            <Stack direction={"column"} spacing={1}>
                <Divider orientation={"horizontal"} flexItem/>
                <Typography sx={{fontWeight: "bold"}}>Looking for a
                    job: {profile.lookingForAJob ? 'Yes' : 'No'}</Typography>

                {profile.lookingForAJob &&
                    <Typography sx={{fontWeight: "bold"}}>My professional skills
                        : {profile.lookingForAJobDescription}</Typography>
                }
                <Typography sx={{fontWeight: "bold"}}> About me : {profile.aboutMe}</Typography>
                <Divider orientation={"horizontal"} flexItem/>
                <Typography sx={{fontWeight: "bold"}}>Contacts: {Object.keys(profile.contacts).map(key => {
                    return <Contact key={key} contactName={key} contactValue={profile.contacts[key as keyof ContactsType]}/>
                })}</Typography>
                {isOwner && <Button variant={"contained"} onClick={goToEditMode}>Edit profile</Button>}
            </Stack>
        </Box>

    )

};

type ContactType = {
    contactName: string
    contactValue: string
}


const Contact: React.FC<ContactType> = ({contactName, contactValue}) => {
    return (
        <Typography display={"flex"} alignItems={"center"} padding={"10px"} margin={"5px"} sx={{maxWidth: "450px", marginLeft: "60px"}}>{
            contactName === "facebook" ? <Facebook fontSize={"large"} /> :
                contactName === "website" ? <WebAsset fontSize={"large"}/> :
                    contactName === "vk" ? <ConnectWithoutContact fontSize={"large"}/> :
                        contactName === "twitter" ? <Twitter fontSize={"large"}/> :
                            contactName === "instagram" ? <Instagram fontSize={"large"}/> :
                                contactName === "youtube" ? <YouTube fontSize={"large"}/> :
                                    contactName === "github" ? <GitHub fontSize={"large"}/> :
                                        contactName === "mainLink" ? <Link fontSize={"large"}/> :
                                            contactName
        }: {contactValue}</Typography>
    )
}

export default ProfileData