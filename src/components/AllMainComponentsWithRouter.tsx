import {Route, Routes} from 'react-router-dom'
import Login from './Login/Login'
import News from './common/NotFound/News/News'
import Music from './Music/Music'
import Settings from './Settings/Settings'
import React from 'react'
import {Box} from '@mui/material'
import {Navigate} from 'react-router'
import NotFound from './common/NotFound/NotFound'
import Preloader from './common/Preloader/Preloader'

const DialogsContainer = React.lazy(() => import('./Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./Profile/ProfileContainer'))
const UsersContainer = React.lazy(() => import('./Users/UsersContainer'))


const AllMainComponentsWithRouter = () => {
    return (<React.Suspense fallback={<Preloader/>}>
            <Box flex={4} p={2}>
                <Routes>
                    <Route path="/" element={<Navigate to="/profile"/>}/>
                    <Route path="/dialogs/*" element={<DialogsContainer/>}/>
                    <Route path="/profile" element={<ProfileContainer/>}/>
                    <Route path="/profile/:userId" element={<ProfileContainer/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/users" element={<UsersContainer/>}/>
                    <Route path="/news" element={<News/>}/>
                    <Route path="/music" element={<Music/>}/>
                    <Route path="/settings" element={<Settings/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </Box>
        </React.Suspense>
    )
}


export default AllMainComponentsWithRouter