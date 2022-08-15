import React from 'react'
import Header from './Header'
import {logOut} from '../../redux/authReducer'
import {connect} from 'react-redux'
import {AppStateType} from '../../redux/reduxStore'

type MapStatePropsType = {
    isAuth: boolean
    login: string | null
}

class HeaderContainer extends React.Component {

    render() {

        return (
            // @ts-ignore
            <Header {...this.props}  />
        )
    }
}
let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(mapStateToProps, {logOut})(HeaderContainer)