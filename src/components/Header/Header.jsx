import s from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header className={s.header}>
            <img src="https://www.onlygfx.com/wp-content/uploads/2018/03/grunge-circle-2-4.png" alt={'logo'}/>
            <div className={s.loginBlock}>
                {props.isAuth ? <div>{props.login} - <button onClick={props.logOut}>Log out</button></div> :
                    <NavLink to={'/login'} className={s.loginText}>Log in</NavLink>}

            </div>
        </header>
    );
}

export default Header;