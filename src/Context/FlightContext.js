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
    if (!from) newErrors.from = "Please select a departure city.";
    if (!to) newErrors.to = "Please select a destination city.";
    if (!departureDate) newErrors.departureDate = "Please select a departure date.";
    if (tripType === "Round Trip" && !returnDate) newErrors.returnDate = "Please select a return date.";
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
      }}
    >
      {children}
    </FlightContext.Provider>
  );
};
