import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Quiz, QuizRounded, Restore, Route, Settings } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function TemporaryDrawer({ isOpen, toggleDrawer }) {


    /*     const toggleDrawer = (anchor, open) => (event) => {
            if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
                return;
            }
    
            setState({ ...state, [anchor]: open });
        };
     */
    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem button component={Link} to="/Dashboard">
                    <ListItemIcon>
                        <AccountCircle />
                    </ListItemIcon>
                    <ListItemText>User Page</ListItemText>
                </ListItem>

                <ListItem button component={Link} to="/quiz">
                    <ListItemIcon>
                        <QuizRounded />
                    </ListItemIcon>
                    <ListItemText>Quiz</ListItemText>
                </ListItem>

                <ListItem button component={Link} to="/dashboard" >
                    <ListItemIcon>
                        <Restore />
                    </ListItemIcon>
                    <ListItemText>History</ListItemText>
                </ListItem>

                <ListItem button component={Link} to="/dashboard">
                    <ListItemIcon>
                        <Settings />
                    </ListItemIcon>
                    <ListItemText>Settings</ListItemText>
                </ListItem>

                {/*                 {['User Page', 'History', 'Quiz', 'Settings'].map((text, index) => (
                    <ListItem button component={Link} to="/quiz" key={text}>

                        <ListItemIcon>
                            {index === 0 ? <AccountCircle /> : index === 1 ? <Restore /> : index === 2 ? <QuizRounded /> : <Settings />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))} */}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <Drawer
                anchor={'left'}
                open={isOpen}
                onClose={toggleDrawer}
            >
                {list('left')}
            </Drawer>
        </div>
    );
}
