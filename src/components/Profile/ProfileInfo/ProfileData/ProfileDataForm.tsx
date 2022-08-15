import React from 'react'

import {useFormik} from 'formik'
import * as Yup from 'yup'
import s from '../ProfileInfo.module.css'
import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Stack,
    Switch,
    TextField,
    Typography
} from '@mui/material'
import {ProfileDataFormType} from '../../../../Types/types'

const validationSchema = Yup.object().shape({

    fullName: Yup.string()
        .min(2, 'Must be longer than 2 characters !')
        .max(25, 'Must be shorter than 50 characters !')
        .required('Required !'),

    lookingForAJobDescription: Yup.string()
        .min(2, 'Must be longer than 2 characters !')
        .max(50, 'Must be shorter than 50 characters !')
        .required('Required !'),

    aboutMe: Yup.string()
        .min(2, 'Must be longer than 2 characters !')
        .max(50, 'Must be shorter than 50 characters !')
        .required('Required !'),

})

const ProfileDataForm: React.FC<ProfileDataFormType> = (props) => {

    let {editMode, profile, handleSubmit, goToViewMode} = props

    let objectFromApiCopy = JSON.parse(JSON.stringify(profile))

    const arrayWithNames = Object.keys(profile.contacts)

    arrayWithNames.forEach((item) => {
        let value = objectFromApiCopy.contacts[item]
        if (value === null) {
            objectFromApiCopy.contacts[item] = ''
        }
    })
    console.log(objectFromApiCopy)

    const formik = useFormik({
        initialValues: objectFromApiCopy,
        validationSchema: validationSchema,
        onSubmit: (values, bagWithMethods) => {
            let {setStatus, setSubmitting} = bagWithMethods

            handleSubmit(values, setStatus, setSubmitting, goToViewMode)
        }
    })
    let contactsForm = (name: string) => {
        return (
            <div key={name} className={s.contactItem}>
                <TextField
                    label={name}
                    name={`contacts.${name}`}
                    id={name}
                    placeholder={name}
                    onChange={formik.handleChange}/>
            </div>)
    }
    return <Dialog open={editMode} fullWidth
                   maxWidth='sm'>
        <DialogTitle>Change profile data</DialogTitle>
        <DialogContent>
            <form onSubmit={formik.handleSubmit}>
                <Stack direction={'column'} spacing={2} >

                    <TextField name='fullName'
                               label='Full name'
                               placeholder='Alex Jones'
                               value={formik.values.fullName}
                               onChange={formik.handleChange}
                    />

                    <Box>
                        <Switch value={formik.values.lookingForAJob}/>
                        <Typography component='label'>Looking for a job</Typography>
                    </Box>

                    <TextField label={'My Skills'}
                               placeholder={'Type here'}
                               minRows={3}
                               multiline
                               name={'lookingForAJobDescription'}
                               value={formik.values.lookingForAJobDescription}
                               onChange={formik.handleChange}
                    />

                    <TextField label={'About me'}
                               placeholder={'Type here'}
                               minRows={3}
                               multiline
                               name={'aboutMe'}
                               value={formik.values.aboutMe}
                               onChange={formik.handleChange}
                    />

                    <Stack direction={'column'} spacing={2} >
                        <Typography>Contacts:</Typography>
                        {arrayWithNames.map(name => contactsForm(name))}
                    </Stack>

                    {formik.status && <Alert severity='error'>{formik.status}</Alert>}

                    <Button  variant={'contained'} type={'submit'}
                             disabled={formik.isSubmitting}
                    >{formik.isSubmitting ? 'Please wait...' : 'Save'}
                    </Button>

                    <Button variant={'contained'} sx={{color: 'red'}} onClick={goToViewMode}
                            type={'button'}
                            className={s.cancelButton}> Cancel
                    </Button>
                </Stack>


            </form>
        </DialogContent>
    </Dialog>
}



export default ProfileDataForm