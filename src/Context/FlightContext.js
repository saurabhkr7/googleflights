import React, { createContext, useState, useContext } from "react";

const FlightContext = createContext();

export const useFlightContext = () => {
  return useContext(FlightContext);
};

export const FlightProvider = ({ children }) => {
  const [tripType, setTripType] = useState("Round Trip");
  const [travelers, setTravelers] = useState({ adults: 1, children: 0, infants: 0 });
  const [cabinClass, setCabinClass] = useState("Economy");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    const newErrors = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to only compare dates
  
    // Check for missing fields
    if (!from) newErrors.from = "Please select a departure city.";
    if (!to) newErrors.to = "Please select a destination city.";
    if (!departureDate) newErrors.departureDate = "Please select a departure date.";
    if (tripType === "Round Trip" && !returnDate) {
      newErrors.returnDate = "Please select a return date.";
    }
  
    // Additional validations
    if (from && to && from === to) {
      newErrors.to = "Departure and destination cities cannot be the same.";
    }
    if (departureDate) {
      const depDate = new Date(departureDate);
      if (depDate < today) {
        newErrors.departureDate = "Departure date cannot be in the past.";
      }
    }
    if (tripType === "Round Trip" && departureDate && returnDate) {
      const depDate = new Date(departureDate);
      const retDate = new Date(returnDate);
  
      if (retDate < depDate) {
        newErrors.returnDate = "Return date cannot be before the departure date.";
      }
      if (retDate < today) {
        newErrors.returnDate = "Return date cannot be in the past.";
      }
    }
  
    console.log(newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const handleSearch = () => {
    if (validateInputs()) {
      console.log("Searching flights with:", {
        tripType,
        travelers,
        cabinClass,
        from,
        to,
        departureDate,
        returnDate,
      });
      // Add search API integration here
    }
  };

  return (
    <FlightContext.Provider
      value={{
        tripType,
        setTripType,
        travelers,
        setTravelers,
        cabinClass,
        setCabinClass,
        from,
        setFrom,
        to,
        setTo,
        departureDate,
        setDepartureDate,
        returnDate,
        setReturnDate,
        errors,
        handleSearch,
        validateInputs
      }}
    >
      {children}
    </FlightContext.Provider>
  );
};
