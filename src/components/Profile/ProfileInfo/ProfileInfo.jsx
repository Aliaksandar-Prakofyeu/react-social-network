import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from "../../../assets/images/avatarPlaceholder.png";
import ProfileStatusWithHooks from "./ProfileStatus/ProfileStatusWithHooks";

const ProfileInfo = ({isOwner,profile, status, updateStatus, updatePhoto}) => {
    if (!profile) {
        return <Preloader/>
    }
    const onMainPhotoSelcted = (e) => {
       if (e.target.files.length){
           updatePhoto(e.target.files[0])
       }
    }
    return (
        <div>
            <div className={s.descriptionBlock}>
                <img className={s.profileImage}
                     src={profile.photos.large != null ? profile.photos.large : userPhoto}/>
                { isOwner && <input type={"file"} onChange={onMainPhotoSelcted}/> }
                <div>{profile.fullName}</div>
                <div>{profile.aboutMe}</div>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
            </div>
        </div>
    )
}

export default ProfileInfo;