import s from './FormControls.module.css'
import {Field} from "redux-form";
import React from "react";

export const FormControl = ({input, meta: {touched, error}, ...props}) => {
    const hasError = touched && error;
    return <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
        <props.fieldType {...input} {...props} />
        {hasError && <span>{error}</span>}
    </div>
}

export const createField = (placeholder, name, fieldType, component, validate, props={}, text='') =>
    (<div>
        <Field placeholder={placeholder}
               name={name}
               fieldType={fieldType}
               component={component}
               validate={validate}
               {...props}/> {text}
    </div>)
