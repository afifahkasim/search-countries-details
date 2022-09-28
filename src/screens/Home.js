// move what is in Home.js to here later
import axios from 'axios'
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import NavigationBar from '../components/NavigationBar.js';
import SearchInput from '../components/SearchInput.js';
import CardView from '../components/CardView.js';

function Home() {

  const url = 'https://restcountries.com/v3.1/all'
  const url2 = 'https://restcountries.com/v3.1/name/'

  const [country, setCountry] = useState([])

  const getAllCountries = async () => {
    try {
      await axios.get(url).then(response => setCountry(response.data));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAllCountries();
  }, [])

  const searchCountry = async term => {
    if (term.length < 3 || term === '') return
    await axios.get(url2 + term).then(response => setCountry(response.data));
  }

  return (
    <div className='home'>
      <NavigationBar />
      <SearchInput placeholder="Search for a country name.." onChange={term => searchCountry(term.target.value)} /> 
      <CardView array={country} />
      {/* {console.log(country[3].name.common)} */}
    </div>
  );
}

export default Home;