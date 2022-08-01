import {BottomNavigation, BottomNavigationAction, Box, Paper} from "@mui/material";
import {Feed, Group, Message, Person} from "@mui/icons-material";


const BottomNav = () => {
    return (
        <Box sx>
            <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0, display: {xs: "block", sm: "none"}}}
                   elevation={3}>
                <BottomNavigation>
                    <BottomNavigationAction href='/react-social-network/Profile'
                                            value='profile'
                                            label='Profile'
                                            icon={<Person/>}/>
                    <BottomNavigationAction href='/react-social-network/users'
                                            value='users'
                                            label='Users'
                                            icon={<Group/>}/>
                    <BottomNavigationAction href='/react-social-network/dialogs'
                                            value='dialogs'
                                            label='Dialogs'
                                            icon={<Message/>}/>
                    <BottomNavigationAction href='/react-social-network/news'
                                            value='news'
                                            label='News'
                                            icon={<Feed/>}/>
                </BottomNavigation>
            </Paper>
        </Box>
    )
}

export default BottomNav
