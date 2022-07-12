import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from "../../../assets/images/avatarPlaceholder.png";
import ProfileStatusWithHooks from "./ProfileStatus/ProfileStatusWithHooks";
import {useState} from "react";
import ProfileDataForm from "./ProfileStatus/ProfileDataForm";


const ProfileInfo = ({isOwner, profile, status, updateStatus, updatePhoto, updateProfile}) => {

    let [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            updatePhoto(e.target.files[0])
        }
    }
    const handleSubmit = (formData, setStatus,
                          setSubmitting, goToViewMode) => {

        updateProfile( formData, setStatus, setSubmitting, goToViewMode );

    }
    return (
        <div>
            <div className={s.descriptionBlock}>
                <img className={s.profileImage}
                     src={profile.photos.large != null ? profile.photos.large : userPhoto} alt={'Avatar'}/>
                {isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
                <br/>
                {editMode ?
                    <ProfileDataForm profile={profile}  handleSubmit={handleSubmit}  goToViewMode={() => {setEditMode(false)}}/> :
                    <ProfileData profile={profile} goToEditMode={() => {setEditMode(true)}} isOwner={isOwner}/>}
            </div>
        </div>
    )
};




const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return <div>
        <div>{profile.fullName}</div>
        <br/>
        <div>
            <b>Looking for a job: {profile.lookingForAJob ? 'Yes' : 'No'}</b>
            <br/>
            {profile.lookingForAJob && <div>
                <b>My professional skills</b>: {profile.lookingForAJobDescription}
            </div>}
        </div>
        <div>
            <b> About me</b>: {profile.aboutMe}
        </div>
        <hr/>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
            return <Contact key={key} contactName={key} contactValue={profile.contacts[key]}/>
        })}
        </div>
        <br/>
        {isOwner && <button onClick={goToEditMode}>Edit profile</button>}
    </div>
};


const Contact = ({contactName, contactValue}) => {
    return <div className={s.contactItem}><b>{contactName}</b>: {contactValue}</div>
}

export default ProfileInfo;