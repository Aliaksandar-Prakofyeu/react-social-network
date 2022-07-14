

const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return <div>
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
    return <div ><b>{contactName}</b>: {contactValue}</div>
}

export default ProfileData