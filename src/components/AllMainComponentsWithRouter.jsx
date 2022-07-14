import {Route, Routes} from "react-router-dom";
import Login from "./Login/Login";
import News from "./News/News";
import Music from "./Music/Music";
import Settings from "./Settings/Settings";
import React from "react";
import DialogsContainer from "./Dialogs/DialogsContainer";
import ProfileContainer from "./Profile/ProfileContainer";
import UsersContainer from "./Users/UsersContainer";
import {Box} from "@mui/material";

const AllMainComponentsWithRouter = () => {
    return (
        <Box  flex={4} p={2}>
            <Routes>
                <Route path='/dialogs/*' element={<DialogsContainer/>}/>
                <Route path='/profile/*' element={<ProfileContainer/>}/>
                <Route path='/profile/:userId' element={<ProfileContainer/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/users' element={<UsersContainer/>}/>
                <Route path='/news' element={<News/>}/>
                <Route path='/music' element={<Music/>}/>
                <Route path='/settings' element={<Settings/>}/>
            </Routes>
        </Box>

    )
}

export default AllMainComponentsWithRouter