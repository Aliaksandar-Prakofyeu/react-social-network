import React from 'react'
import {Field, reduxForm} from "redux-form";
import {FormControl} from "../common/FormControls/FormControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {logIn, logOut} from "../../redux/authReducer";
import {Navigate} from "react-router";
import s from '../common/FormControls/FormControls.module.css'

const maxLength100 = maxLengthCreator(100);

const LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field placeholder={'Login'} name={'email'} fieldType={'input'} component={FormControl}
                   validate={[required, maxLength100]}/>
        </div>
        <div>
            <Field placeholder={'Password'} name={'password'} fieldType={'input'} type={'password'}
                   component={FormControl} validate={[required, maxLength100]}/>
        </div>
        <div>
            <Field component={FormControl} name={'rememberMe'} fieldType={'input'} type={"checkbox"}/> remember me
        </div>
        {props.error && <div className={s.formSummaryError}>{props.error}</div>}
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