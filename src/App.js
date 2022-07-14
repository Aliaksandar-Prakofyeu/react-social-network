import './App.css';
import Nav from "./components/Nav/Nav";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import Login from "./components/Login/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderСontainer";
import {Component, useState} from "react";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/reduxStore";
import React from "react";
import {ThemeProvider, createTheme, Stack, Box} from "@mui/material";
import AllMainComponentsWithRouter from "./components/AllMainComponentsWithRouter";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));


class App extends Component {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {


        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (

            <Box>
                <HeaderContainer/>
                <Stack direction={"row"} spacing={2} justifyContent={"space-between"}>
                    <Nav/>
                    <React.Suspense fallback={<Preloader/>}>
                        <AllMainComponentsWithRouter/>
                    </React.Suspense>
                </Stack>
            </Box>

        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})


let AppContainer = connect(mapStateToProps, {initializeApp})(App);

let SocialNetworkApp = (props) => {
    return <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default SocialNetworkApp