import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = ({ fetchData }) => {

  const [inputValue, setInputValue] = useState('');
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleButtonClick = () => {
    if (inputValue === ''){
      alert('Enter no of bedrooms.')
    } else {
      fetchData(inputValue);
    }
  }

  return (
    <div>
      <div className="body-container">
        <p>
          House price predictor is really helpful for buying or building a new
          house because you will be able to know previously how much of costs will takes.
        </p>
        <div className="input-container">
          <input type="number" name="broom" value={inputValue} onChange={handleInputChange} placeholder="Enter No of Bedroom" />
          <Link to='/result'><button onClick={handleButtonClick}>Submit</button></Link>
        </div>    
      </div>
    </div>
  );
};

export default Home;
