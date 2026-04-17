import React, { useState } from 'react';
import { Box, IconButton, Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export function HamburgerMenu() {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (openState) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(openState);
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        window.location.reload();
    };

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                    onClick={toggleDrawer(true)}
                    aria-label="open drawer"
                    sx={{
                        bgcolor: 'var(--button)',
                        color: '#f4f7ff',
                        '&:hover': { bgcolor: 'rgba(20, 184, 166, 0.9)' },
                    }}
                >
                    <MenuIcon />
                </IconButton>
            </Box>

            <Drawer
                anchor="left"
                variant="temporary"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                <Box sx={{ p: 2, width: 250, backgroundColor: '#f4f7ff' }}>
                    <List>
                        <ListItemButton onClick={toggleDrawer(false)}>
                            <ListItemText primary="Home" />
                        </ListItemButton>
                        <ListItemButton onClick={toggleDrawer(false)}>
                            <ListItemText primary="Archive" />
                        </ListItemButton>

                        <ListItemButton 
                            button 
                            onClick={() => {
                                setOpen(false);
                                handleLogout();
                            }}
                        >
                            <ListItemText primary="Log out" />
                        </ListItemButton>
                    </List>
                </Box>
            </Drawer>
        </>
    );
}