import React from "react";
import Profile from "./Profile";
import {setUserProfile} from "../../redux/profileReducer";
import {connect} from "react-redux";
import {useLocation, useParams} from "react-router-dom";
import {useNavigate} from 'react-router';
import {profileAPI} from "../../api/api";


class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.router.params.userId;
        if (!userId) {
            userId = 2;
        }
        profileAPI.getProfile(userId).then(data=> {
            this.props.setUserProfile(data);
        });
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        );
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile
});

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{location, navigate, params}}
            />
        );
    }

    return ComponentWithRouterProp;
}


export default connect(mapStateToProps, {setUserProfile})(withRouter(ProfileContainer));