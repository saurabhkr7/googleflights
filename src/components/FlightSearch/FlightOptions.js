import React from "react";
import { useFlightContext } from "../../Context/FlightContext";
import { MenuItem, Select, InputLabel, FormControl, Typography } from "@mui/material";

const FlightOptions = () => {
  const { tripType, setTripType, travelers, setTravelers, cabinClass, setCabinClass } = useFlightContext();

  const handleTravelerChange = (type, value) => {
    setTravelers((prev) => ({ ...prev, [type]: Math.max(0, value) }));
  };

  return (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <FormControl variant="outlined" size="small">
        <InputLabel>Trip Type</InputLabel>
        <Select
          value={tripType}
          onChange={(e) => setTripType(e.target.value)}
          label="Trip Type"
        >
          <MenuItem value="One Way">One Way</MenuItem>
          <MenuItem value="Round Trip">Round Trip</MenuItem>
          <MenuItem value="Multi City">Multi City</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" size="small">
        <InputLabel>Travelers</InputLabel>
        <Select label="Travelers" value={travelers.adults + travelers.children + travelers.infants}>
          <MenuItem>
            <Typography>Adults</Typography>
            <input
              type="number"
              min="0"
              value={travelers.adults}
              onChange={(e) => handleTravelerChange("adults", parseInt(e.target.value))}
              style={{ width: "50px", marginLeft: "8px" }}
            />
          </MenuItem>
          <MenuItem>
            <Typography>Children</Typography>
            <input
              type="number"
              min="0"
              value={travelers.children}
              onChange={(e) => handleTravelerChange("children", parseInt(e.target.value))}
              style={{ width: "50px", marginLeft: "8px" }}
            />
          </MenuItem>
          <MenuItem>
            <Typography>Infants</Typography>
            <input
              type="number"
              min="0"
              value={travelers.infants}
              onChange={(e) => handleTravelerChange("infants", parseInt(e.target.value))}
              style={{ width: "50px", marginLeft: "8px" }}
            />
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" size="small">
        <InputLabel>Cabin Class</InputLabel>
        <Select
          value={cabinClass}
          onChange={(e) => setCabinClass(e.target.value)}
          label="Cabin Class"
        >
          <MenuItem value="Economy">Economy</MenuItem>
          <MenuItem value="Premium Economy">Premium Economy</MenuItem>
          <MenuItem value="Business">Business</MenuItem>
          <MenuItem value="First Class">First Class</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default FlightOptions;
