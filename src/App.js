import './App.css';
import React, { useState } from 'react';
import Header from './Header';
import Home from './Home';
import Result from './Result';
import {Route, Routes} from 'react-router-dom';

function App() {
  const [prices, setPrices] = useState([]);
  const [bedroom, setBedroom] = useState('');
  const [bedrooms, setBedrooms] = useState([]);
  const [bathrooms, setBathrooms] = useState([]);
  const [squares, setSquares] = useState([]);
  const [neighbors, setNeighbors] = useState([]);

  const fetchData = async (bedroom) => {
    try {
      const response = await fetch(`/house?hroom=${bedroom}`);
      const responseData = await response.json();
      setPrices(responseData.prices);
      setBedrooms(responseData.bedrooms);
      setBathrooms(responseData.bathrooms);
      setSquares(responseData.squares);
      setNeighbors(responseData.neighbors);
      console.log("Data fetched:", responseData.prices);
      console.log("Bedrooms",responseData.bedrooms);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const handleInputChange = (e) => {
    const value = e.target.value;
    setBedroom(parseInt(value, 10) || '');
  }
  
  return (
    <div className="App">
      <Header />
        <Routes>
          <Route path='/' element={<Home bedroom={bedroom} handleInputChange={handleInputChange} fetchData={fetchData}/>}></Route>
          <Route path='/result' element={<Result prices={prices} bedrooms={bedrooms} bathrooms={bathrooms} squares={squares} neighbors={neighbors}/>}></Route>
        </Routes>
    </div>
  );
}

export default App;
