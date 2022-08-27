import {Accordion, AccordionDetails, AccordionSummary, Box, Button, Divider, Stack, Typography} from '@mui/material'
import {
    ConnectWithoutContact, ExpandMore,
    Facebook,
    GitHub,
    Instagram,
    Link,
    Twitter,
    WebAsset,
    YouTube
} from '@mui/icons-material'
import {ContactsType, ProfileType} from '../../../../Types/types'
import React from 'react'

type ProfileDataType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}

const ProfileData: React.FC<ProfileDataType> = ({profile, isOwner, goToEditMode}) => {
    return (
        <Box>
            <Stack direction={'column'} spacing={1} >
                <Divider  textAlign="right">{isOwner && <Button variant='text' size='small'  color='inherit' onClick={goToEditMode}>Edit profile</Button>}</Divider>
                <Typography sx={{fontWeight: 'bold'}}>Looking for a
                    job: {profile.lookingForAJob ? 'Yes' : 'No'}</Typography>

                {profile.lookingForAJob &&
                    <Typography sx={{fontWeight: 'bold'}}>My professional skills
                        : {profile.lookingForAJobDescription}</Typography>
                }
                <Typography sx={{fontWeight: 'bold'}}> About me : {profile.aboutMe}</Typography>

                <Accordion square elevation={0} sx={{ borderBottom: '1px solid #dddddd', borderRadius: '0px' }}>
                    <AccordionSummary expandIcon={<ExpandMore/>} aria-controls="panel1a-content"
                                      id="panel1a-header" sx={{padding:0}} >
                        <Typography sx={{fontWeight: 'bold'}} >Show Contacts</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {Object.keys(profile.contacts).map(key => {
                            return <Contact key={key} contactName={key} contactValue={profile.contacts[key as keyof ContactsType]}/>
                        })}</AccordionDetails>
                </Accordion>
                {/*<Typography sx={{fontWeight: 'bold'}}>Contacts: {Object.keys(profile.contacts).map(key => {
                    return <Contact key={key} contactName={key} contactValue={profile.contacts[key as keyof ContactsType]}/>
                })}</Typography>
                {isOwner && <Button variant={'contained'} onClick={goToEditMode}>Edit profile</Button>}*/}
            </Stack>
        </Box>
    )
}

type ContactType = {
    contactName: string
    contactValue: string
}


const Contact: React.FC<ContactType> = ({contactName, contactValue}) => {
    return (<Box>
            <Typography display={'flex'} alignItems={'center'} sx={{fontWeight: 'bold'}}>{
                contactName === 'facebook' ? <Facebook fontSize={'large'} /> :
                    contactName === 'website' ? <WebAsset fontSize={'large'}/> :
                        contactName === 'vk' ? <ConnectWithoutContact fontSize={'large'}/> :
                            contactName === 'twitter' ? <Twitter fontSize={'large'}/> :
                                contactName === 'instagram' ? <Instagram fontSize={'large'}/> :
                                    contactName === 'youtube' ? <YouTube fontSize={'large'}/> :
                                        contactName === 'github' ? <GitHub fontSize={'large'}/> :
                                            contactName === 'mainLink' ? <Link fontSize={'large'}/> :
                                                contactName
            }: {contactValue}</Typography>
            <Divider/>
    </Box>

    )
}

export default ProfileData