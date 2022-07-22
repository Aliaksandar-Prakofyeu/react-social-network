import React from "react";
import {useFormik} from "formik";
import * as yup from "yup";
import {Box, Button, Stack, Switch, TextField, Typography} from "@mui/material";

const validationSchema = yup.object({
    email: yup.string().email().required("Email is required"),

    password: yup.string()
        .required("Password is required")
        .min(8, "Password is too short - should be 6 chars minimum")
});


const LoginForm = (props) => {
    const {handleSubmit} = props;
    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
          rememberMe: false
        },
        validationSchema: validationSchema,
        onSubmit: (values)=>{
            handleSubmit(values);
        }
    });
    return(<form onSubmit={formik.handleSubmit}>
        <Stack direction={"column"} alignItems={"stretch"} spacing={2} sx={{maxWidth: "400px"}}>
            <Typography align={"center"} flex={1} variant={"h3"}>Log in</Typography>
            <TextField flex={2}
                name="email"
                type="email"
                placeholder="example@email.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
            />
            <TextField flex={2}
                name="password"
                type="password"
                placeholder="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
            />
            <Box flex={1} >
                <Switch value={formik.values.rememberMe}/>
                <Typography component="label">Remember me</Typography>
            </Box>
            <Button flex={1}  variant={"contained"} type={"submit"}>Log In</Button>
        </Stack>

    </form>)

}

export default LoginForm;