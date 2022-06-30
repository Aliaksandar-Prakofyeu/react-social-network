import s from './Header.module.css';
import React from "react";
import {
    AppBar,
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography
} from "@mui/material";
import {useNavigate} from "react-router";
import {AccountCircle, EmojiPeople} from "@mui/icons-material";


const Header = (props) => {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/login`;
        navigate(path);
    }
    const [anchorEl, setAnchorEl] = React.useState(null);


    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box sx={{flexGrow: 1}} className={s.header}>
            <AppBar position="static">
                <Toolbar>
                    <EmojiPeople/>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Social Network
                    </Typography>
                    {props.isAuth ? (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <Typography vsriant={'h5'} component={'span'}>{props.login}</Typography>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile Settings</MenuItem>
                                <MenuItem onClick={props.logOut}>Log Out</MenuItem>
                            </Menu>
                        </div>
                    ) : (<Button onClick={routeChange} color={"inherit"}>Login</Button>)}
                </Toolbar>
            </AppBar>
        </Box>
        /*
                <header className={s.header}>
                    <img src="https://www.onlygfx.com/wp-content/uploads/2018/03/grunge-circle-2-4.png" alt={'logo'}/>
                    <div className={s.loginBlock}>
                        {props.isAuth ? <div>{props.login} - <button onClick={props.logOut}>Log out</button></div> :
                            <NavLink to={'/login'} className={s.loginText}>Log in</NavLink>}

                    </div>
                </header>*/
    );
}

export default Header;