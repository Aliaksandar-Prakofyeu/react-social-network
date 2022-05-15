import s from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import React from "react";

const Profile = (props) => {

    return (
        <main className={s.item}>
            <ProfileInfo profile={props.profile}  />
            <MyPostsContainer  />
        </main>
    );
}

export default Profile;