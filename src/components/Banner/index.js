import React from "react";
import { Box, Typography } from "@mui/material";

// Banner Component
const Banner = () => {
  // URL for light and dark theme images
  const lightThemeImage =
    "https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_4.svg";
  const darkThemeImage =
    "https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_dark_theme_4.svg";

  // Simulate theme detection (replace with actual logic in real use)
  const isDarkTheme = false; // Example; replace with actual theme context or state

  return (
    <Box
      sx={{
        position: "relative",
        height: "300px",
        backgroundImage: `url(${isDarkTheme ? darkThemeImage : lightThemeImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      role="presentation"
    >
      <Typography
        variant="h2"
        component="div"
        sx={{
          position: "absolute",
          bottom: "20px",
          color: isDarkTheme ? "#fff" : "#000",
          fontWeight: "bold",
        }}
      >
        Flights
      </Typography>
    </Box>
  );
};

export default Banner;
