import './App.css';
import Nav from "./components/Nav/Nav";
import {BrowserRouter} from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderСontainer";
import React, {Component} from "react";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/reduxStore";
import {Box, Stack} from "@mui/material";
import AllMainComponentsWithRouter from "./components/AllMainComponentsWithRouter";



class App extends Component {

    catchAllUnhandledErrors = (reason, promise) =>{
        alert("Some error occurred");

    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
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