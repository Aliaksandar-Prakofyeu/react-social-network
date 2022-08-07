export type PostType = {
    id: number
    message: string
    likesCount: number
}

export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type PhotosType = {
    small: string | null
    large: string | null
}

export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
    aboutMe: string
}

export type ProfileInfoType = {
    isOwner: boolean
    profile: ProfileType
    status: string
    updateStatus: (status:string) => void
    updatePhoto: (photo: File) =>  void
    updateProfile: (formData: ProfileType, setStatus: any, setSubmitting: any, goToViewMode: any) => void
}

export type ProfileDataFormType = {
    editMode: boolean
    profile: ProfileType
    handleSubmit: (formData: ProfileType, setStatus: any, setSubmitting: any, goToViewMode: any) => void
    goToViewMode: () => void
}

export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}

export type DialogItemType = {
    name: string
    id: number
}

export type MessageType = {
    message: string
}

export type NewMessageDataType = {
    newMessageText: string
}

export type LoginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

