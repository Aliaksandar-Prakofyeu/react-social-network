import React from 'react'
import Profile from './Profile'
import {getProfile, getStatus, updatePhoto, updateProfile, updateStatus} from '../../redux/profileReducer'
import {connect} from 'react-redux'
import {useLocation, useParams} from 'react-router-dom'
import {useNavigate} from 'react-router'
import {withAuthRedirect} from '../hoc/withAuthRedirect'
import {compose} from 'redux'
import {ProfileType} from '../../Types/types'
import {AppStateType} from '../../redux/reduxStore'


type MapStateType = {
    profile: ProfileType
    status: string
    signedUserId: number
    isAuth: number
}

type MapDispatchType = {
    getProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    updatePhoto: (photo: File) => void
    updateProfile: (formData: ProfileType, setStatus: any, setSubmitting: any, goToViewMode: any) => void
    router: any
}

type ProfileContainerType = MapStateType & MapDispatchType

class ProfileContainer extends React.Component<ProfileContainerType> {

    refreshProfile() {
        let userId: number | null = this.props.router.params.userId
        if (!userId) {
            userId = this.props.signedUserId
        }

        this.props.getProfile(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: ProfileContainerType, prevState: ProfileContainerType) {
        if (this.props.router.params.userId !== prevProps.router.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <Profile {...this.props}
                     isOwner={!this.props.router.params.userId}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
                     updatePhoto={this.props.updatePhoto}
                     updateProfile={this.props.updateProfile}
            />
        )
    }
}

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    signedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})

function withRouter(Component: any) {
    function ComponentWithRouterProp(props: any) {
        let location = useLocation()
        let navigate = useNavigate()
        let params = useParams()
        return (
            <Component
                {...props}
                router={{location, navigate, params}}
            />
        )
    }

    return ComponentWithRouterProp
}

export default compose(withRouter,
    connect(mapStateToProps, {getProfile, getStatus, updateStatus, updatePhoto, updateProfile}),
    withAuthRedirect)
(ProfileContainer)
