import React from "react";
import { AppBar, Toolbar, IconButton, Button, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AppsIcon from "@mui/icons-material/Apps";
import Brightness4Icon from "@mui/icons-material/Brightness4";

// Header Component
const Header = () => {
  return (
    <AppBar position="static" color="default">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <MenuButton />
        <NavigationButtons />
        <UserActions />
      </Toolbar>
    </AppBar>
  );
};

// Menu Button Component
const MenuButton = () => (
  <IconButton edge="start" color="inherit" aria-label="menu">
    <MenuIcon />
  </IconButton>
);

// Navigation Buttons Component
const NavigationButtons = () => (
  <Box sx={{ display: "flex", gap: 2 }}>
    <Button variant="text" color="inherit">
      Google
    </Button>
    <Button variant="text" color="inherit">
      Travel
    </Button>
    <Button variant="contained" color="primary">
      Flights
    </Button>
    <Button variant="text" color="inherit">
      Hotels
    </Button>
    <Button variant="text" color="inherit">
      Vacation rentals
    </Button>
  </Box>
);

// User Actions Component
const UserActions = () => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
    <IconButton color="inherit" aria-label="theme">
      <Brightness4Icon />
    </IconButton>
    <IconButton color="inherit" aria-label="apps">
      <AppsIcon />
    </IconButton>
    <IconButton color="inherit" aria-label="profile">
      <AccountCircleIcon />
    </IconButton>
  </Box>
);

export default Header;
