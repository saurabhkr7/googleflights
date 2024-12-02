import React from "react";
import { Button, Box,  } from "@mui/material";
import { TextField, Grid2 } from "@mui/material";
import {FlightProvider, useFlightContext } from "../../Context/FlightContext";
import FlightOptions from "./FlightOptions";
import Typeahead from "../TypeAhead";

const FlightSearch = () => {
  const { from, setFrom, to, setTo, departureDate, setDepartureDate, returnDate, setReturnDate, tripType, errors, handleSearch } = useFlightContext();

  return (
    <FlightProvider>
      <Box sx={{ p: 4, borderRadius: 2, boxShadow: 3, backgroundColor: "#fff" }}>
        <FlightOptions />
        <Box mt={4}>
        <Grid2 container spacing={2}>
      <Grid2 item xs={12} md={4}>
        <Typeahead 
        value={from} 
        label="Where from?" 
        error={!!errors.from}
        helperText={errors.from}
        onSelection={(data) => setFrom(data)} />
      </Grid2>
      <Grid2 item xs={12} md={4}>
        <Typeahead 
        value={to} 
        label="Where to?"
        error={!!errors.to}
        helperText={errors.to}
        onSelection={(data) => setTo(data)} />
      </Grid2>
      <Grid2 item xs={12} md={4}>
        <TextField
          label="Departure Date"
          type="date"
          variant="outlined"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          error={!!errors.departureDate}
          helperText={errors.departureDate}
        />
      </Grid2>
      {tripType === "Round Trip" && (
        <Grid2 item xs={12} md={4}>
          <TextField
            label="Return Date"
            type="date"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            error={!!errors.returnDate}
            helperText={errors.returnDate}
          />
        </Grid2>
      )}
    </Grid2>
        </Box>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 4 }}
          onClick={handleSearch}
        >
          Search Flights
        </Button>
      </Box>
    </FlightProvider>
  );
};

export default FlightSearch;
