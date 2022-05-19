import s from './MyPosts.module.css';
import Post from "./Post/Post";
import React from "react";
import {Field, reduxForm} from "redux-form";

const NewPostForm = (props) => {
   return <form onSubmit={props.handleSubmit}>
        <div>
            <Field placeholder={'Type your post here'} name={'newPostText'} component={'textarea'}/>
        </div>
        <div>
            <button>Add New</button>
        </div>
    </form>
}

const NewPostReduxForm = reduxForm({form: 'newPost'})(NewPostForm)


const MyPosts = (props) => {
    let postsElements = props.posts.map(p => <Post message={p.message} likeCount={p.likeCount} key={p.id}/> );

    let onAddPost = () => {
        props.addPost();
    };

    let onPostChange = (e) => {
        let text = e.target.value;
        props.updateNewPostText(text);
    };

    const onSubmit = (formData) => {
        console.log(formData);
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <NewPostReduxForm onSubmit={onSubmit}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
}

export default MyPosts;