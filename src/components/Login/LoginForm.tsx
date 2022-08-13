import React from "react";
import {useFormik} from "formik";
import * as yup from "yup";
import {Alert, Box, Button, Stack, Switch, TextField, Typography} from "@mui/material";
import {LoginFormDataType} from "../../Types/types";

const validationSchema = yup.object({
    email: yup.string().email().required("Email is required"),

    password: yup.string()
        .required("Password is required")
        .min(8, "Password is too short - should be 6 chars minimum")
});



type LoginFormType = {
    handleSubmit: (props: LoginFormDataType, setStatus: any, setSubmitting: any) => void
    captchaUrl: string | null
}

const LoginForm: React.FC<LoginFormType> = (props) => {
    const {handleSubmit, captchaUrl} = props
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
            captcha: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values,bagWithMethods) => {
            let {setStatus, setSubmitting} = bagWithMethods
            handleSubmit(values, setStatus, setSubmitting)
        }
    })
    return  ( <form onSubmit={formik.handleSubmit}>
        <Stack direction={"column"} alignItems={"stretch"} spacing={2} sx={{maxWidth: "400px"}}>
            <Typography align={"center"} flex={1} variant={"h3"}>Log in</Typography>
            <TextField sx={{flex:2}}
                       name="email"
                       type="email"
                       label={'Email'}
                       placeholder="example@email.com"
                       value={formik.values.email}
                       onChange={formik.handleChange}
                       error={formik.touched.email && Boolean(formik.errors.email)}
                       helperText={formik.touched.email && formik.errors.email}
            />
            <TextField sx={{flex:2}}
                       name="password"
                       type="password"
                       label={'Password'}
                       placeholder="password"
                       value={formik.values.password}
                       onChange={formik.handleChange}
                       error={formik.touched.password && Boolean(formik.errors.password)}
                       helperText={formik.touched.password && formik.errors.password}
            />
            <Box flex={1}>
                <Switch value={formik.values.rememberMe}/>
                <Typography component="label">Remember me</Typography>
            </Box>
            {captchaUrl && <Stack>
                <img alt={"captcha"} src={captchaUrl}/>
                <TextField name="captcha"
                           placeholder="type symbols from captcha here"
                           value={formik.values.captcha}
                           onChange={formik.handleChange}
                />
            </Stack>}
            {formik.status && <Alert severity="error">{formik.status}</Alert>}
            <Button sx={{flex:2}} variant={"contained"} type={"submit"}>Log In</Button>
        </Stack>

    </form>)

}

export default LoginForm;