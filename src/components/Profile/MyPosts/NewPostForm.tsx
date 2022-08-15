import {useFormik} from 'formik'
import {Button, Stack, TextField} from '@mui/material'
import React from 'react'

type NewPostForm = {
    addPost: (newPostText: string) => void
}

const NewPostForm: React.FC<NewPostForm> = (props) => {

    const OnAddPost = (values: string) => {
        props.addPost(values)
    }
    const formik = useFormik({
        initialValues: {
            newPostText: ''
        },
        onSubmit: (values) => {
            OnAddPost(values.newPostText)
            values.newPostText= ''
        }
    })
    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack direction={'column'} display={'flex'} spacing={1}>
                <TextField sx={{flex: 3}}
                           label={'New Post'}
                           placeholder={'Type here'}
                           minRows={3}
                           multiline
                           name={'newPostText'}
                           value={formik.values.newPostText}
                           onChange={formik.handleChange}
                />
                <Button variant={'contained'} type={'submit'} sx={{flex: 1}}>Add post</Button>
            </Stack>
        </form>)
}

export default NewPostForm