import React from 'react'
import {connect} from 'react-redux'
import {logIn, logOut} from '../../redux/authReducer'
import {Navigate} from 'react-router'
import LoginForm from './LoginForm'
import {Box} from '@mui/material'
import {AppStateType} from '../../redux/reduxStore'
import {LoginFormDataType} from "../../Types/types";


type MapStateType = {
    captchaUrl: string | null
    isAuth: boolean
}

type MapDispatchType = {
    logIn: (email: string, password: string, rememberMe: boolean, captcha: any, setStatus: any, setSubmitting: any) => void
    logOut: () => void
}


type LoginType =  MapStateType & MapDispatchType



const Login: React.FC<LoginType> = (props) => {
    const handleSubmit = (formData: LoginFormDataType, setStatus: any, setSubmitting: any) => {
        props.logIn(formData.email, formData.password, formData.rememberMe , formData.captcha,setStatus , setSubmitting );
    }
    if (props.isAuth) {
        return (<Navigate to={`/profile`}/>)
    }
    return(
        <Box>
            <LoginForm handleSubmit={handleSubmit} captchaUrl={props.captchaUrl}/>
        </Box>
        )
}
const mapStateToProps = (state: AppStateType): MapStateType => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect<MapStateType, MapDispatchType, {} , AppStateType>(mapStateToProps, {logIn, logOut})(Login)