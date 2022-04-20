import './App.css';
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {BrowserRouter, Routes, Route} from "react-router-dom";

const App = (props) => {
    return (
        <div className='app-wrapper'>
            <Header/>
            <Nav/>
            <div className={'app-wrapper-main'}>
                <Routes>
                    <Route path='/dialogs/*' element={<Dialogs
                        dialogsPage={props.state.dialogsPage}
                        dispatch={props.dispatch}/>}/>
                    <Route path='/profile' element={<Profile
                        profilePage={props.state.profilePage}
                        dispatch={props.dispatch}/>}/>
                    <Route path='/news' element={<News/>}/>
                    <Route path='/music' element={<Music/>}/>
                    <Route path='/settings' element={<Settings/>}/>
                </Routes>
            </div>
        </div>


    )
        ;
}


export default App;
