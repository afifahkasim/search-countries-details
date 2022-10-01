// move what is in Home.js to here later
import axios from 'axios'
import React, { useState, useEffect } from 'react';
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

// const url = 'https://restcountries.com/v3.1/all'
// const url2 = 'https://restcountries.com/v3.1/name/'
// const url3 = 'https://restcountries.com/v3.1/region/'

// const getAllCountries = async (countries) => {
//     try {
//         await axios.get(url).then(response => { countries(response.data) });
//     } catch (error) {
//         console.error(error);
//     }
// }

function Home() {

    const url = 'https://restcountries.com/v3.1/all'
    const url2 = 'https://restcountries.com/v3.1/name/'
    const url3 = 'https://restcountries.com/v3.1/region/'

    const [country, setCountry] = useState([])
    // const [regionList, setRegionList] = useState([])
    const regionList = ["America", "Asia", "Africa", "Europe", "Oceania", "Antarctic"]
    const [toggle, setToggle] = useState(false)

    const getAllCountries = async () => {
        try {
            await axios.get(url).then(response => {
                setCountry(response.data)
                // setRegionList(_.uniqBy(response.data, "region").map(e => e.region))
            }
            );
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getAllCountries()
        // getAllCountries(setCountry)
    }, [])

    const searchCountry = async term => {
        if (term.length < 3 || term === '') return
        await axios.get(url2 + term).then(response => setCountry(response.data));
    }

    const filterByRegion = async region => {
        if (region === '') return
        await axios.get(url3 + region).then(response => setCountry(response.data));
    }

    return (
        <div className='home'>
            <NavigationBar />
            <Container className='search-container align-items-center'>
                <Row className='row-height'>
                    <Col xs={12} md={6} className='col-1 col-height'>
                        <SearchInput placeholder="Search for a country name.." onChange={term => searchCountry(term.target.value)} />
                    </Col>

                    <Col xs={0} md={3} className='col-2'>
                    </Col>

                    <Col xs={12} md={3} className='col-3 col-height align-items-center'>
                            <DropdownList array={regionList} />
                            <ToggleLabel state={toggle} onChange={click => setToggle(click.target.checked)} />
                    </Col>
                </Row>
            </Container>
            {
                toggle === false ?
                <CardView array={country} /> :
                <TableView array={country} />
            }
        </div>
    );
}

export default Home;
// export {getAllCountries}