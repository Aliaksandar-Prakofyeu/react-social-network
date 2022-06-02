import React from 'react'
import {Field, reduxForm} from "redux-form";
import {createField, FormControl} from "../common/FormControls/FormControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {logIn, logOut} from "../../redux/authReducer";
import {Navigate} from "react-router";
import s from '../common/FormControls/FormControls.module.css'

const maxLength100 = maxLengthCreator(100);

const LoginForm = ({handleSubmit, error}) => {
    return <form onSubmit={handleSubmit}>
        {createField('Login','email','input', FormControl,[required, maxLength100]  )}
        {createField('Password','password','input', FormControl,[required, maxLength100], {type: 'password'})}
        {createField(null,'rememberMe','input', FormControl,null, {type: 'checkbox'},  'remember me')}
        {error && <div className={s.formSummaryError}>{error}</div>}
        <div>
            <button>Log in</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.logIn(formData.email, formData.password, formData.rememberMe);
    }

    if (props.isAuth) {
        return (<Navigate to={`/profile`}/>)
    }
    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {logIn, logOut})(Login)