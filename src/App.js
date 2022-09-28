import './App.css';
import axios from 'axios'
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/NavigationBar.js';


function App() {

  const url = 'https://restcountries.com/v3.1/all'
  const url2 = 'https://restcountries.com/v3.1/name/'

  const [country, setCountry] = useState([])

  const getAllCountries = async () => {
    try {
      await axios.get(url).then(response => console.log(response.data));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAllCountries();
  }, [])

  const searchCountry = async term => {
    if (term.length < 3 || term === '') return
    await axios.get(url2 + term).then(response => console.log(response.data));
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-800 dark:text-white">
      <NavigationBar></NavigationBar>
      <div className="flex container mx-auto mb-16">
        <i className="fa fa-search my-auto -mr-9 z-10 pr-2 pl-3 py-5 rounded-md text-gray-400"></i>
        <input type="text" placeholder="Search for a country..." className="pl-10 p-2 shadow-md rounded-md w-1/3 dark:bg-gray-700" onChange={term => searchCountry(term.target.value)} />
      </div>

    </div>
  );
}

export default App;
