import React, { useState, useEffect } from "react";
import { Box, TextField, List, ListItem, Typography } from "@mui/material";
import axios from "axios";

const Typeahead = ({ value,label,error, helperText, onSelection }) => {
  const [query, setQuery] = useState(""); // Query typed by the user
  const [suggestions, setSuggestions] = useState([]); // API response data
  const [loading, setLoading] = useState(false); // Loading indicator
  const [selected, setSelected] = useState(null); // Selected item state

  // Debounce logic
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(() => {
      fetchSuggestions(query);
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [query]);

// Fetch suggestions from API
const fetchSuggestions = async (input) => {
    setLoading(true);
    const url = `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${input}&locale=en-US`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "2691463d2bmsh408b6f61aca21d0p13b568jsnadbd7adc06a2",
        "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.get(url, options);
      if (response.data?.status) {
        setSuggestions(response.data.data.slice(0, 5)); // Top 5 results
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle user selection
  const handleSelect = (item) => {
    setSelected(item);
    setQuery(item.presentation.title); // Update input field
    setSuggestions([]); // Clear suggestions
    if (onSelection) onSelection(item); // Pass selected data to parent
  };

  return (
    <Box sx={{ width: "300px", position: "relative" }}>
      <TextField
        label={label}
        fullWidth
        variant="outlined"
        size="small"
        error={error}
        helperText={helperText}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search airport or city"
        autoComplete="off"
      />
      {loading && <Typography variant="caption">Loading...</Typography>}
      {suggestions.length > 0 && (
        <List
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "#fff",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            maxHeight: "200px",
            overflowY: "auto",
            zIndex: 10,
          }}
        >
          {suggestions.map((item) => (
            <ListItem
              button
              key={item.navigation.entityId}
              onClick={() => handleSelect(item)}
            >
              <Typography>{item.presentation.title}</Typography>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default Typeahead;
