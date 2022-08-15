import {useFormik} from 'formik'
import {Button, Stack, TextField} from '@mui/material'
import React from 'react'
import * as yup from 'yup'
import {Send} from '@mui/icons-material'
import {NewMessageDataType} from '../../../Types/types'


const validationSchema = yup.object().shape({
    newMessageText: yup.string()
        .required('Enter your message')
        .max(180, 'Message should be of maximum 180 characters length')
})

type NewMessageFormType = {
    handleSubmit: (newMessageText: NewMessageDataType) => void
}


const NewMessageForm: React.FC<NewMessageFormType> = (props) => {
        const {handleSubmit} = props
        const formik = useFormik({
            initialValues: {
                newMessageText: '',
            },
            validationSchema: validationSchema,
            onSubmit: (values) => {
                handleSubmit(values)
            },
        })
    return(
        <form onSubmit={formik.handleSubmit}>
            <Stack  direction={'row'} spacing={1}>
                <TextField
                    sx={{flex: 4}}
                multiline
                placeholder={'Enter your message'}
                name={'newMessageText'}
                value={formik.values.newMessageText}
                onChange={formik.handleChange}
                type={'text'}
                error={formik.touched.newMessageText && Boolean(formik.errors.newMessageText)}
                helperText={formik.touched.newMessageText && formik.errors.newMessageText}/>
                <Button variant={'text'} sx={{flex: 1}} type={'submit'} ><Send/></Button>
            </Stack>

        </form>
    )
}

export default NewMessageForm