import {Box, Button, Stack, Typography} from "@mui/material";


const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return (
        <Box>
            <Stack>
                <Typography sx={{fontWeight: "bold"}}>Looking for a job: {profile.lookingForAJob ? 'Yes' : 'No'}</Typography>

                {profile.lookingForAJob &&
                    <Typography>My professional skills : {profile.lookingForAJobDescription}</Typography>
                }
                <Typography> About me :</Typography> {profile.aboutMe}
                <Typography>Contacts:</Typography> {Object.keys(profile.contacts).map(key => {
                return <Contact key={key} contactName={key} contactValue={profile.contacts[key]}/>
            })}
                {isOwner && <Button variant={"contained"} onClick={goToEditMode}>Edit profile</Button>}
            </Stack>
        </Box>

    )

};


const Contact = ({contactName, contactValue}) => {
    return <Typography>{contactName}: {contactValue}</Typography>
}

export default ProfileData