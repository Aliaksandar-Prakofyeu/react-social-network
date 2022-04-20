import s from './Post.module.css';

const Post = (props) => {
    return (
        <div className={s.item}>
            <img src={'https://freepikpsd.com/file/2019/10/avatar-png-2-Transparent-Images.png'} alt={"profilePic"}/>
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