import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from "../../../assets/images/avatarPlaceholder.png";

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div>
                <img src='https://photographylife.com/wp-content/uploads/2020/03/Ultra-Wide-Angle-Panoramas-1.jpg'
                     alt='main content'/>
            </div>
            <div className={s.descriptionBlock}>
                <img className={s.profileImage}
                     src={props.profile.photos.large != null ? props.profile.photos.large : userPhoto}/>
                <div>{props.profile.fullName}</div>
                <div>{props.profile.aboutMe}</div>
            </div>
        </div>
    )
}

export default ProfileInfo;