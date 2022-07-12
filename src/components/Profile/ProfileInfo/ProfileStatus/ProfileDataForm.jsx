import React from "react";

import {ErrorMessage, Field, FieldArray, Form, Formik} from "formik";
import * as Yup from "yup";
import s from './../ProfileInfo.module.css'
import {ErrorMessageWrapper} from "../../../common/ErrorMessageWrapper/ErrorMessageWrapper";

const validationSchema = Yup.object().shape( {

    fullName: Yup.string()
        .min( 2, "Must be longer than 2 characters !" )
        .max( 25, "Must be shorter than 50 characters !" )
        .required( "Required !" ),

    lookingForAJobDescription: Yup.string()
        .min( 2, "Must be longer than 2 characters !" )
        .max( 50, "Must be shorter than 50 characters !" )
        .required( "Required !" ),

    aboutMe: Yup.string()
        .min( 2, "Must be longer than 2 characters !" )
        .max( 50, "Must be shorter than 50 characters !" )
        .required( "Required !" ),

} );

let contactsForm = (name) => {
    return (
        <div key={name} className={s.contactItem}>
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
        </div>);
}


const ProfileDataForm = (props) => {

    let {profile, handleSubmit, goToViewMode} = props;

    let objectFromApiCopy = JSON.parse( JSON.stringify( profile ) );

    const arrayWithNames = Object.keys( profile.contacts );

    arrayWithNames.forEach( (item) => {
        let value = objectFromApiCopy.contacts[item];
        if (value === null) {
            objectFromApiCopy.contacts[item] = '';
        }
    } )


    return (
        <div>

            <Formik
                initialValues={objectFromApiCopy}
                validationSchema={validationSchema}
                onSubmit={(values, bagWithMethods) => {
                    let {setStatus, setSubmitting } = bagWithMethods;

                    handleSubmit( values, setStatus, setSubmitting, goToViewMode);
                }}
            >
                {(propsF) => {

                    let {status, isSubmitting} = propsF;

                    return (
                        <Form>

                            <div>
                                <Field
                                    name={'fullName'}
                                    type={'text'}
                                    placeholder={'Full name'}
                                />
                            </div>
                            <ErrorMessage name="fullName">
                                {ErrorMessageWrapper}
                            </ErrorMessage>

                            <div>
                                < br />
                            </div>

                            <div>
                                <Field
                                    name={'lookingForAJob'}
                                    type={'checkbox'}
                                    id='lookingForAJob' />
                                <label htmlFor={'lookingForAJob'}>
                                    <b> Looking for a job</b> </label>
                            </div>

                            <div>
                                < br />
                            </div>

                            <div>
                                <Field
                                    name={'lookingForAJobDescription'}
                                    as={'textarea'}
                                    placeholder={'My professional skills'}
                                />
                            </div>
                            <ErrorMessage name="lookingForAJobDescription">
                                {ErrorMessageWrapper}
                            </ErrorMessage>

                            <div>
                                < br />
                            </div>

                            <div>
                                <Field
                                    name={'aboutMe'}
                                    as={'textarea'}
                                    placeholder={'About me'}
                                />
                            </div>
                            <ErrorMessage name="aboutMe">
                                {ErrorMessageWrapper}
                            </ErrorMessage>

                            <div>
                                < br />
                            </div>

                            <div>
                                <b>Contacts</b>:
                            </div>

                            <FieldArray
                                name="contacts"
                                render={() => (
                                    <div>
                                        {arrayWithNames.map( name => contactsForm( name ) )}
                                    </div>
                                )}
                            />

                            <div>
                                < br />
                            </div>

                            {status &&
                                <div className={s.validationError}>
                                    <b> ..{status} - with setStatus </b>
                                </div>}

                            <button type={'submit'}
                                    disabled={isSubmitting}
                            >{isSubmitting ? "Please wait..." : "Save"}
                            </button>

                            <button onClick={goToViewMode}
                                    type={'button'}
                                    className={s.cancelButton}> Cancel
                            </button>

                        </Form>
                    )
                }}
            </Formik>


            <div>
                < br />
            </div>


        </div>)
}

export default ProfileDataForm;