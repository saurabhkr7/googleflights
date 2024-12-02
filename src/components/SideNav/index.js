import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FlightIcon from "@mui/icons-material/Flight";
import HotelIcon from "@mui/icons-material/Hotel";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LanguageIcon from "@mui/icons-material/Language";
import PlaceIcon from "@mui/icons-material/Place";
import SettingsIcon from "@mui/icons-material/Settings";
import FeedbackIcon from "@mui/icons-material/Feedback";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import ExploreIcon from "@mui/icons-material/Explore";

const SideNav = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const primaryOptions = [
    { label: "Travel", icon: <ExploreIcon /> },
    { label: "Flights", icon: <FlightIcon /> },
    { label: "Hotels", icon: <HotelIcon /> },
    { label: "Vacation rentals", icon: <HomeWorkIcon /> },
  ];

  const secondaryOptions = [
    { label: "Tracked flight prices", icon: <TrackChangesIcon /> },
    { label: "Change language", icon: <LanguageIcon /> },
    { label: "Change currency", icon: <AttachMoneyIcon /> },
    { label: "Change location", icon: <PlaceIcon /> },
  ];

  const bottomOptions = [
    { label: "Flights settings", icon: <SettingsIcon /> },
    { label: "Feedback", icon: <FeedbackIcon /> },
    { label: "Help", icon: <HelpOutlineIcon /> },
  ];

  return (
    <>
      {/* Menu Button */}
      <IconButton color="inherit" onClick={toggleDrawer(true)} edge="start">
        <MenuIcon />
      </IconButton>

      {/* Side Drawer */}
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <Box
            sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
            }}
            role="presentation"
            onClick={toggleDrawer(false)}
        >
            {/* Top Content */}
            <div>
            {/* Primary Navigation Options */}
            <List>
                {primaryOptions.map((item, index) => (
                <ListItem key={index} disablePadding>
                    <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                    </ListItemButton>
                </ListItem>
                ))}
            </List>
            <Divider />
            {/* Secondary Navigation Options */}
            <List>
                {secondaryOptions.map((item, index) => (
                <ListItem key={index} disablePadding>
                    <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                    </ListItemButton>
                </ListItem>
                ))}
            </List>
            </div>

            {/* Bottom Content */}
            <div>
            <Divider />
            <List>
                {bottomOptions.map((item, index) => (
                <ListItem key={index} disablePadding>
                    <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                    </ListItemButton>
                </ListItem>
                ))}
            </List>
            </div>
        </Box>
        </Drawer>

    </>
  );
};

export default SideNav;
