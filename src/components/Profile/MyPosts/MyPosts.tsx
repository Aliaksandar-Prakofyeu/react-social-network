
// @ts-ignore
import s from './MyPosts.module.css'
import Post from './Post/Post'
import React from 'react'
import NewPostForm from './NewPostForm'
import {PostType} from '../../../Types/types'

type PropsType = {
    posts: Array<PostType>
    addPost: (newPostText: string) => void
}

const MyPosts: React.FC<PropsType> = (props) => {

    let postsElements = props.posts.map(p =>
        <Post message={p.message}
              likesCount={p.likesCount}
              id={p.id} key={p.id}/> )

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <NewPostForm addPost={props.addPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts