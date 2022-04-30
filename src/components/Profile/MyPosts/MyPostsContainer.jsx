import React from "react";
import {addPostActionCreator} from "../../../redux/profileReducer";
import {updateNewPostTextActionCreator} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        addPost: () => (dispatch(addPostActionCreator())),
        updateNewPostText: (text) => (dispatch(updateNewPostTextActionCreator(text)))
    }
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;