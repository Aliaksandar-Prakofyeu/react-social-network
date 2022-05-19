import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from "../../../assets/images/avatarPlaceholder.png";
import ProfileStatus from "./ProfileStatus/ProfileStatus"
const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div className={s.descriptionBlock}>
                <img className={s.profileImage}
                     src={props.profile.photos.large != null ? props.profile.photos.large : userPhoto}/>
                <div>{props.profile.fullName}</div>
                <div>{props.profile.aboutMe}</div>
                <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
            </div>
        </div>
    )
}

export default ProfileInfo;