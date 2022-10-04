// move what is in Home.js to here later
import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react';
import _ from "lodash";

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import NavigationBar from '../components/NavigationBar.js';
import SearchInput from '../components/SearchInput.js';
import ToggleLabel from '../components/ToggleLabel.js';
import CardView from '../components/CardView.js';
import TableView from '../components/TableView.js';
import DropdownList from '../components/DropdownList.js';
import { ThemeContext } from "../styles/ThemeContext";

function Home() {
    const { darkMode } = useContext(ThemeContext);

    const url = 'https://restcountries.com/v3.1/all'
    const urlName = 'https://restcountries.com/v3.1/name/'
    const urlRegion = 'https://restcountries.com/v3.1/region/'

    const [country, setCountry] = useState([])
    // const [regionList, setRegionList] = useState([]) //TODO, dropdown: Dynamic dropdown choices
    const regionList = ["All", "America", "Asia", "Africa", "Europe", "Oceania", "Antarctic"]
    const [toggle, setToggle] = useState(JSON.parse(localStorage.getItem("TOGGLE_VIEW")))
    const [title, setTitle] = useState("Filter by Region")
    const [direction, setDirection] = useState(null)
    const [selectedColumn, setSelectedColumn] = useState(null)
    // const [query, setQuery] = useState(""); //TODO, search: Display 0 data when search input is '' or wrong

    const getAllCountries = async () => {
        try {
            await axios.get(url).then(response => {
                const sortedData = _.orderBy(response.data, ['name.common'], ['asc'])
                setCountry(sortedData)

                // if (response.data.status === 404) {
                //     setCountry([])
                //     return;
                // } // For TODO, search

                // setRegionList(_.uniqBy(response.data, "region").map(e => e.region)) // For TODO, dropdown
            }
            );
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getAllCountries()
    }, [])

    useEffect(() => {
        localStorage.setItem("TOGGLE_VIEW", toggle);
    }, [toggle]);

    // useEffect(() => {
    //     const searchCountries = async () => {
    //         const res = await axios.get(urlName + query);
    //         setCountry(res.data);
    //     };
    //     searchCountries()
    //     console.log(country)
    // }, [query]) // For TODO, search

    const searchCountry = async term => {
        if (term.length < 3 || term === '') return
        await axios.get(urlName + term).then(response => setCountry(response.data));
    }

    const filterByRegion = async region => {
        if (region === 'All') {
            return await axios.get(url).then(response => setCountry(response.data))
        }
        else {
            return await axios.get(urlRegion + region).then(response => setCountry(response.data))
        }
    }

    const sortTable = (column) => {
        const newDirection = direction === "desc" ? "asc" : "desc"
        const sortedData = _.orderBy(country, [column], [newDirection])

        setDirection(newDirection)
        setCountry(sortedData)
    }

    return (
        <div className={darkMode ? 'home' : 'home dark'}>
            <NavigationBar />
            <Container className='search-container align-items-center'>
                <Row className='row-height'>
                    <Col xs={12} md={6} className='col-1 col-height'>
                        <SearchInput placeholder="Search for a country name.." onChange={term => searchCountry(term.target.value)} />
                        {/* <SearchInput placeholder="Search for a country name.." onChange={term => setQuery(term.target.value)} /> */}
                    </Col>

                    <Col xs={6} md={4} className='col-2'>
                        <DropdownList array={regionList} onSelect={(val) => { filterByRegion(val); setTitle(val) }} title={title} />
                    </Col>


                    <Col xs={6} md={2} className='col-3'>
                        <ToggleLabel state={toggle} onChange={click => setToggle(click.target.checked)} />
                    </Col>

                    {/* <Col xs={12} md={6} className='col-3 col-height align-items-center'>
                        <DropdownList array={regionList} onSelect={(val) => { filterByRegion(val); setTitle(val) }} title={title} />
                        <ToggleLabel state={toggle} onChange={click => setToggle(click.target.checked)} />
                    </Col> */}
                </Row>
            </Container>

            {
                toggle === false ?
                    <CardView array={country} direction={direction}
                        onClickSort={(val) => {
                            setSelectedColumn(val.target.innerText);
                            val.target.innerText === "Country" ? sortTable('name.common') : sortTable(val.target.innerText.toLowerCase())
                        }}
                        selectedColumn={selectedColumn} /> :
                    <TableView array={country} direction={direction}
                        onClickHeader={(val) => {
                            setSelectedColumn(val.target.innerText);
                            val.target.innerText === "Country" ? sortTable('name.common') : sortTable(val.target.innerText.toLowerCase())
                        }}
                        selectedColumn={selectedColumn} />
            }
        </div>
    );
}

export default Home;