import './App.css'
import Nav from './components/Nav/Nav'
import {BrowserRouter} from 'react-router-dom'
import HeaderContainer from './components/Header/HeaderСontainer'
import React, {Component} from 'react'
import {connect, Provider} from 'react-redux'
import {initializeApp} from './redux/appReducer'
import Preloader from './components/common/Preloader/Preloader'
import store, {AppStateType} from './redux/reduxStore'
import {Box, Stack} from '@mui/material'
import AllMainComponentsWithRouter from './components/AllMainComponentsWithRouter'
import BottomNav from './components/Nav/BottomNav'


type MapPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchType = {
    initializeApp: () => void
}


class App extends Component<MapPropsType & MapDispatchType> {

    catchAllUnhandledErrors = (e: PromiseRejectionEvent) =>{
        alert('Some error occurred')

    }

    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    render() {

        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <Box>
                <HeaderContainer/>
                <Stack direction={'row'} spacing={2} justifyContent={'space-between'}>
                    <Nav/>
                    <AllMainComponentsWithRouter/>
                    <BottomNav />
                </Stack>
            </Box>
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})


let AppContainer = connect(mapStateToProps, {initializeApp})(App)

let SocialNetworkApp: React.FC = () => {
    return <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default SocialNetworkApp