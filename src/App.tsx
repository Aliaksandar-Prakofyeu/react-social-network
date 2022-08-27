import './App.css'
import Nav from './components/Nav/Nav'
import HeaderContainer from './components/Header/HeaderСontainer'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {initializeApp} from './redux/appReducer'
import Preloader from './components/common/Preloader/Preloader'
import {AppStateType} from './redux/reduxStore'
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


export default connect(mapStateToProps, {initializeApp})(App)



