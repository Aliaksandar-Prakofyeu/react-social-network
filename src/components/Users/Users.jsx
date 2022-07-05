import React from "react";
import Paginator from "../Paginator/Paginator";
import User from "./User";
import {Field, Form, Formik, useFormik} from "formik";


const Users = ({totalUsersCount, pageSize, currentPage, onPageChanged, ...props}) => {
    return <div>
            <UsersSearchForm/>
        <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage}
                   onPageChanged={onPageChanged}/>
        <div>{
            props.users.map(u => <User user={u}
                                       followingInProgress={props.followingInProgress}
                                       follow={props.follow}
                                       unfollow={props.unfollow} key={u.id}/>
            )
        }</div>
    </div>
}

const UsersSearchForm = () => {

    return <Formik
        initialValues={{
            term: '',
        }}
        onSubmit={async (values) => {
            await new Promise((r) => setTimeout(r, 500));
            alert(JSON.stringify(values, null, 2));
        }}
    >
        <Form>
            <Field
                id=""
                name="term"
                placeholder="jane@acme.com"
                type="text"
            />
            <button type="submit">Find</button>
        </Form>
    </Formik>
}

export default Users;