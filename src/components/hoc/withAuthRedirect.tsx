import React from "react";
import {Navigate} from "react-router";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/reduxStore";

let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
});

export const withAuthRedirect = (Component: any) => {
    class RedirectComponent extends React.Component {
        render() {
            // @ts-ignore
            if (!this.props.isAuth) return <Navigate to={`/login`}/>
            return <Component {...this.props}/>
        }
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectedAuthRedirectComponent
}