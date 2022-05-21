import React from 'react'
import {Field, reduxForm} from "redux-form";
import {FormControl} from "../common/FormControls/FormControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";

const maxLength10 = maxLengthCreator(10);

const LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field placeholder={'Login'}  name={'login'} fieldType={'input'} component={FormControl} validate={[required, maxLength10]}/>
        </div>
        <div>
            <Field placeholder={'Password'} name={'password'} fieldType={'input'} type={'password'}component={FormControl} validate={[required, maxLength10]}/>
        </div>
        <div>
            <Field component={FormControl} name={'rememberMe'} fieldType={'input'} type={"checkbox"}/> remember me
        </div>
        <div>
            <button>Log in</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        console.log(formData);
    }
    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

export default Login