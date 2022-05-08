import s from './Post.module.css';
import userPhoto from "../../../../assets/images/avatarPlaceholder.png";

const Post = (props) => {
    return (
        <div className={s.item}>
            <img src={userPhoto} alt={"profilePic"}/>
            {props.message}
            <div>
                <span>Like</span> {props.likeCount}
            </div>

            <div>
                <span>Dislike</span>
            </div>
        </div>
    );
}

export default Post;