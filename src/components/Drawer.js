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
import { Quiz, QuizRounded, Restore, Route, Settings, Dashboard, DashboardRounded } from '@mui/icons-material';
import { Link, D } from 'react-router-dom';

export default function TemporaryDrawer({ isOpen, toggleDrawer }) {


    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem button component={Link} to="/dashboard" >
                    <ListItemIcon>
                        <DashboardRounded />
                    </ListItemIcon>
                    <ListItemText>Dashboard</ListItemText>
                </ListItem>

                <ListItem button component={Link} to="/profile">
                    <ListItemIcon>
                        <AccountCircle />
                    </ListItemIcon>
                    <ListItemText>Profile</ListItemText>
                </ListItem>

                <ListItem button component={Link} to="/goals">
                    <ListItemIcon>
                        <QuizRounded />
                    </ListItemIcon>
                    <ListItemText>Goals</ListItemText>
                </ListItem>

                <ListItem button component={Link} to="/history">
                    <ListItemIcon>
                        <Restore />
                    </ListItemIcon>
                    <ListItemText>History</ListItemText>
                </ListItem>



            </List>
            <Divider />
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
