import Post from './Post/Post'
import React from 'react'
import NewPostForm from './NewPostForm'
import {PostType} from '../../../Types/types'
import {Stack, Typography} from "@mui/material";

type PropsType = {
    posts: Array<PostType>
    addPost: (newPostText: string) => void
}

const MyPosts: React.FC<PropsType> = (props) => {

    let postsElements = props.posts.map(p =>
        <Post message={p.message}
              likesCount={p.likesCount}
              id={p.id} key={p.id}/>)

    return (
        <Stack direction={'column'} spacing={2}>
            <Typography variant={'h5'} fontWeight='bold'>Posts</Typography>
            <NewPostForm addPost={props.addPost}/>
            <Stack direction='column-reverse'>
                {postsElements}
            </Stack>
        </Stack>
    )
}

export default MyPosts