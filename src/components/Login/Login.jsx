import React from 'react'
import {connect} from "react-redux";
import {logIn, logOut} from "../../redux/authReducer";
import {Navigate} from "react-router";
import LoginForm from "./LoginForm";
import {Box} from "@mui/material";

const Login = (props) => {
    const handleSubmit = (formData) => {
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
const mapStateToProps = (state) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {logIn, logOut})(Login)