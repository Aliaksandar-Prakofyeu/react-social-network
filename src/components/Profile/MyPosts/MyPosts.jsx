import s from './MyPosts.module.css';
import Post from "./Post/Post";
import React, {memo} from "react";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {FormControl} from "../../common/FormControls/FormControls";

const maxLength10 = maxLengthCreator(10)

const NewPostForm = (props) => {
   return <form onSubmit={props.handleSubmit}>
        <div>
            <Field placeholder={'Type your post here'} name={'newPostText'} component={FormControl} fieldType={'textarea'} validate={[required, maxLength10]}/>
        </div>
        <div>
            <button>Add New</button>
        </div>
    </form>
}

const NewPostReduxForm = reduxForm({form: 'newPost'})(NewPostForm)


const MyPosts = (props) => {
    console.log('Render')
    let postsElements = props.posts.map(p => <Post message={p.message} likeCount={p.likeCount} key={p.id}/> );

    const addNewPost = (newPostData) => {
        props.addPost(newPostData.newPostText);
        newPostData.newPostText = ''
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <NewPostReduxForm onSubmit={addNewPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
}

export default MyPosts;