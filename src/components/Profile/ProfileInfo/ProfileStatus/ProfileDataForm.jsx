import React from 'react'
import * as Yup from 'yup'
import {ErrorMessage, Field, FieldArray, Form, Formik, useFormik} from "formik";
import s from "../ProfileInfo.module.css"
import {ErrorMessageWrapper} from "../../../common/ErrorMessageWrapper/ErrorMessageWrapper";


let contactsForm = (name) => {
    return (
        <div key={name} className={s.contact}>
            <div>
                <b>{name}</b>:
            </div>

            <div>
                <Field
                    name={`contacts.${name}`}
                    type={'text'}
                    id={name}
                    placeholder={name}
                />
            </div>
        </div>)
}


const ProfileDataForm = (props) => {
    return <Formik
        initialValues={{fullName: '', lookingForAJob: false, lookingForAJobDescription: '', aboutMe: ''}}
        validationSchema={Yup.object().shape({
            fullName: Yup.string()
                .min(2, 'Must be longer than 2 characters !')
                .max(25, 'Must be shorter than 25 characters !')
                .required('Required!'),

            lookingForAJobDescription: Yup.string()
                .min(2, 'Must be longer than 2 characters !')
                .max(50, 'Must be shorter than 50 characters !')
                .required('Required!'),

            aboutMe: Yup.string()
                .min(2, 'Must be longer than 2 characters !')
                .max(50, 'Must be shorter than 50 characters !')
                .required('Required!')
        })}
        onSubmit={(values) => {
            console.log(values)
        }}
    >
        {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
                <input
                    type="input"
                    name="fullName"
                    placeholder="Full Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.fullName}
                />
                {errors.fullName ? ErrorMessageWrapper(errors.fullName) : null}


                <br/>
                <input
                    type="checkbox"
                    name="lookingForAJob"
                    placeholder="Looking for a job"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lookingForAJob}
                />
                <label htmlFor={'lookingForAJob'}>
                    <b> Looking for a job</b> </label>
                <br/>
                <textarea
                    type="text"
                    name="lookingForAJobDescription"
                    placeholder="Type about your skills"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lookingForAJobDescription}
                />
                {errors.fullName ? ErrorMessageWrapper(errors.lookingForAJobDescription) : null}
                <ErrorMessage name="lookingForAJobDescription">
                    {ErrorMessageWrapper}
                </ErrorMessage>
                <br/>
                <textarea
                    type="text"
                    name="aboutMe"
                    placeholder="About you"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.aboutMe}
                />
                {errors.fullName ? ErrorMessageWrapper(errors.aboutMe) : null}
                <ErrorMessage name="aboutMe">
                    {ErrorMessageWrapper}
                </ErrorMessage>
                <br/>

                <button type="submit" /*disabled={isSubmitting}*/>
                    Submit
                </button>
            </form>
        )}
    </Formik>
}


export default ProfileDataForm;









