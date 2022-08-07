import React from "react";
import {addPostActionCreator} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {PostType} from "../../../Types/types";
import {AppStateType} from "../../../redux/reduxStore";



type MapStateType = {
    posts: Array<PostType>
    newPostText: string
}

type MapDispatchType = {
    addPost: (newPostText: string) => void
}

let mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
};

let mapDispatchToProps = (dispatch: any) => {
    return {
        addPost: (newPostText: string) => (dispatch(addPostActionCreator(newPostText))),
    }
};

const MyPostsContainer = connect<MapStateType, MapDispatchType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;