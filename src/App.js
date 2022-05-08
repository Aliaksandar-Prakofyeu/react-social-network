import './App.css';
import Nav from "./components/Nav/Nav";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {BrowserRouter ,Routes, Route} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderСontainer";

const App = (props) => {
    return (
        <div className='app-wrapper'>
            <HeaderContainer/>
            <Nav/>
            <div className={'app-wrapper-main'}>
                <Routes>
                    <Route path='/dialogs/*' element={<DialogsContainer/>}/>
                    <Route path='/profile/*' element={<ProfileContainer/>}/>
                    <Route path='/profile/:userId' element={<ProfileContainer />}/>
                    <Route path='/users' element={<UsersContainer/>}/>
                    <Route path='/news' element={<News/>}/>
                    <Route path='/music' element={<Music/>}/>
                    <Route path='/settings' element={<Settings/>}/>
                </Routes>
            </div>
        </div>
    );
}


export default App;
