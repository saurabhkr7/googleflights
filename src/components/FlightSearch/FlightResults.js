import React, { useState, useEffect } from 'react';
import { useFlightContext } from "../../Context/FlightContext";
import { Button } from "@mui/material";

const FlightResults = () => {
  const [flights, setFlights] = useState([]);
  const [sortBy, setSortBy] = useState('best');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [limit] = useState(10); // Fetch 10 results per request
  const [offset, setOffset] = useState(0);
  const { from, to, departureDate, returnDate, validateInputs } = useFlightContext();

  const fetchFlights = async () => {

    if(!validateInputs()){
      setError("Enter all the details Correctly!!");
      return
    }
    setFlights([]); // Reset flights on new search
    setOffset(0); // Reset pagination

    const url = `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights?originSkyId=${from.skyId}&destinationSkyId=${to.skyId}&originEntityId=${from.entityId}&destinationEntityId=${to.entityId}&date=${departureDate}&cabinClass=economy&adults=1&sortBy=${sortBy}&currency=USD&market=en-US&countryCode=US&offset=${offset}&limit=${limit}`;

    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '2691463d2bmsh408b6f61aca21d0p13b568jsnadbd7adc06a2',
        'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
      }
    };

    try {
      setLoading(true);
      const response = await fetch(url, options);
      const data = await response.json();

      if (data.status) {
        setFlights((prev) => [...prev, ...data.data.itineraries || []]);
      } else {
        setError("No results found. Please try again.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (newSortBy) => {
    setSortBy(newSortBy);
    fetchFlights();
  };

  const handleLoadMore = () => {
    setOffset((prev) => prev + limit);
    fetchFlights();
  };

  return (
    <div>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 4 }}
          onClick={fetchFlights}
        >
          Search Flights
        </Button>
    {(error || flights.length || loading)
      ?
        <>
      <h1>Flight Search Results</h1>
      <div className="tab-controls">
        <button
          className={sortBy === "best" ? "active" : ""}
          onClick={() => handleTabChange("best")}
        >
          Best
        </button>
        <button
          className={sortBy === "fastest" ? "active" : ""}
          onClick={() => handleTabChange("fastest")}
        >
          fastest
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && flights.length > 0 && (
        <table className="results-table">
        <thead>
          <tr>
            <th>Carrier</th>
            <th>Time</th>
            <th>Duration</th>
            <th>Stops</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight, index) => (
            <tr key={index}>
              <td>
                <img
                  src={flight.legs[0].carriers.marketing[0].logoUrl}
                  alt={flight.legs[0].carriers.marketing[0].name}
                  width="50"
                />
              </td>
              <td>
                {new Date(flight.legs[0].departure).toLocaleTimeString()} →{" "}
                {new Date(flight.legs[0].arrival).toLocaleTimeString()}
              </td>
              <td>
                {Math.floor(flight.legs[0].durationInMinutes / 60)}h{" "}
                {flight.legs[0].durationInMinutes % 60}m
              </td>
              <td>{flight.legs[0].stopCount === 0 ? "Non-stop" : flight.legs[0].stopCount}</td>
              <td>{flight.price.formatted}</td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
        {flights.length > 0 && (
        <button className="load-more" onClick={handleLoadMore}>
          Load More
        </button>
      )}
        </>
        :
        ""
      }
    </div>
  );
};

export default FlightResults;
