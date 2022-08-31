import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {logIn} from '../../redux/authReducer'
import {Navigate} from 'react-router'
import LoginForm from './LoginForm'
import {Box} from '@mui/material'
import {LoginFormDataType} from '../../Types/types'
import {getAuth, getCaptchaUrl} from '../../redux/authSelectors'


export  const Login: React.FC = () => {
    const captchaUrl = useSelector(getCaptchaUrl)
    const isAuth = useSelector(getAuth)

    const dispatch = useDispatch()

    const handleSubmit = (formData: LoginFormDataType, setStatus: any, setSubmitting: any) => {
        dispatch(logIn(formData.email, formData.password, formData.rememberMe, formData.captcha, setStatus, setSubmitting))
    }
    if (isAuth) {
        return (<Navigate to={`/profile`}/>)
    }
    return (
        <Box>
            <LoginForm handleSubmit={handleSubmit} captchaUrl={captchaUrl}/>
        </Box>
    )
}


