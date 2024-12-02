
import './App.css';
import Header from './components/Header';
import Banner from './components/Banner';
import FlightSearch from './components/FlightSearch/FlightSearch';
import {FlightProvider } from "./Context/FlightContext";
function App() {
  return (
    <div className="App">
      <Header />
      <Banner />
      <FlightProvider>
      <FlightSearch />
      </FlightProvider> 
    </div>
  );
}

export default App;
