import s from './MyPosts.module.css';
import Post from "./Post/Post";
import React from "react";
import NewPostForm from "./NewPostForm";


const MyPosts = (props) => {
    console.log('Render')
    let postsElements = props.posts.map(p => <Post message={p.message} likeCount={p.likeCount} key={p.id}/> );



    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <NewPostForm addPost={props.addPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
}

export default MyPosts;