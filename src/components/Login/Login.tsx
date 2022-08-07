import React from 'react'
import {connect} from 'react-redux'
import {logIn, logOut} from '../../redux/authReducer'
import {Navigate} from 'react-router'
import LoginForm from './LoginForm'
import {Box} from '@mui/material'
import {AppStateType} from '../../redux/reduxStore'
import {LoginFormDataType} from "../../Types/types";

type OwnPropsType = {
    pageTitle: string
}

type MapStateType = {
    captchaUrl: string | null
    isAuth: boolean
}

type MapDispatchType = {
    logIn: (email: string, password: string, rememberMe: boolean, captcha: any) => void
    logOut: () => void
}


type LoginType = OwnPropsType & MapStateType & MapDispatchType



const Login: React.FC<LoginType> = (props) => {
    const handleSubmit = (formData: LoginFormDataType) => {
        props.logIn(formData.email, formData.password, formData.rememberMe , formData.captcha);
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
const mapStateToProps = (state: AppStateType) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect<MapStateType, MapDispatchType,OwnPropsType, AppStateType>(mapStateToProps, {logIn, logOut})(Login)