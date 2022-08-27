import {Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material'
import {Feed, Group, Message, MusicNote, Person, Settings} from '@mui/icons-material'

const Nav = () => {

    return (
        <Box flex={1} p={2} sx={{display: {xs: 'none', sm: 'block'}}}>
            <Box position={'fixed'}>
                <List>
                    <ListItem>
                        <ListItemButton component={'a'} href={'/react-social-network/#/profile'}>
                            <ListItemIcon>
                                <Person/>
                            </ListItemIcon>
                            <ListItemText primary={'Profile'}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton component={'a'} href={'/react-social-network/#/users'}>
                            <ListItemIcon>
                                <Group/>
                            </ListItemIcon>
                            <ListItemText primary={'Users'}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton component={'a'} href={'/react-social-network/#/dialogs'}>
                            <ListItemIcon>
                                <Message/>
                            </ListItemIcon>
                            <ListItemText primary={'Dialogs'}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton component={'a'} href={'/react-social-network/#/news'}>
                            <ListItemIcon>
                                <Feed/>
                            </ListItemIcon>
                            <ListItemText primary={'News'}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton component={'a'} href={'/react-social-network/#/music'}>
                            <ListItemIcon>
                                <MusicNote/>
                            </ListItemIcon>
                            <ListItemText primary={'Music'}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton component={'a'} href={'/react-social-network/#/settings'}>
                            <ListItemIcon>
                                <Settings/>
                            </ListItemIcon>
                            <ListItemText primary={'Settings'}/>
                        </ListItemButton>
                    </ListItem>

                </List>
            </Box>
        </Box>
        /*<nav className={s.nav}>
            <MenuList>
                <MenuItem className={s.item}>
                    <NavLink to={'/profile'}
                             className={navData => navData.isActive ? s.active : s.item}>Profile</NavLink>
                </MenuItem>
                <MenuItem className={s.item}>
                    <NavLink to={'/users'} className={navData => navData.isActive ? s.active : s.item}>Users</NavLink>
                </MenuItem>
                <MenuItem className={s.item}>
                    <NavLink to={'/dialogs'}
                             className={navData => navData.isActive ? s.active : s.item}>Messages</NavLink>
                </MenuItem>
                <MenuItem className={s.item}>
                    <NavLink to={'/news'} className={navData => navData.isActive ? s.active : s.item}>News</NavLink>
                </MenuItem>
                <MenuItem className={s.item}>
                    <NavLink to={'/music'} className={navData => navData.isActive ? s.active : s.item}>Music</NavLink>
                </MenuItem>
                <MenuItem className={s.item}>
                    <NavLink to={'/settings'}
                             className={navData => navData.isActive ? s.active : s.item}>Settings</NavLink>
                </MenuItem>
            </MenuList>
        </nav>*/

    )
}

export default Nav