import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from "../../../assets/images/avatarPlaceholder.png";
import ProfileStatusWithHooks from "./ProfileStatus/ProfileStatusWithHooks";
import {useState} from "react";
import ProfileDataForm from "./ProfileStatus/ProfileDataForm";

const ProfileInfo = ({isOwner, profile, status, updateStatus, updatePhoto, saveProfile}) => {

    let [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            updatePhoto(e.target.files[0])
        }
    }
    const onSubmit = (formData) => {
        console.log(formData)
    }
    return (
        <div>
            <div className={s.descriptionBlock}>
                <img className={s.profileImage}
                     src={profile.photos.large != null ? profile.photos.large : userPhoto}/>
                {isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                {editMode ? <ProfileDataForm profile={profile}  onSubmit={onSubmit}/> :
                    <ProfileData profile={profile} goToEditMode={() => {setEditMode(true)}} isOwner={isOwner}/>}
            </div>
        </div>
    )
};




const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return <div>
        {isOwner && <button onClick={goToEditMode}>Edit</button>}
        <div>{profile.fullName}</div>

        <div>
            <b>Looking for a job: {profile.lookingForAJob ? 'Yes' : 'No'}</b>
            {profile.lookingForAJob && <b>{profile.lookingForAJobDescription}</b>}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
            return <Contact key={key} contactName={key} contactValue={profile.contacts[key]}/>
        })}
        </div>
    </div>
};


const Contact = ({contactName, contactValue}) => {
    return <div className={s.contactItem}><b>{contactName}</b>: {contactValue}</div>
}

export default ProfileInfo;