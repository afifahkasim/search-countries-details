import { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation, useParams } from 'react-router'
import _ from "lodash";
import axios from 'axios'
import fetch from "isomorphic-unfetch";
import { getAllCountries } from "./Home"
import { ThemeContext } from '../styles/ThemeContext'

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import NavigationBar from "../components/NavigationBar";
import DetailsHeader from "../components/DetailsHeader";
import DetailsCard from "../components/DetailsCard";


function Details() {
    const { darkMode } = useContext(ThemeContext);

    let params = useParams()
    let { state } = useLocation()
    let navigate = useNavigate()

    console.log(state)

    const url = 'https://restcountries.com/v3.1/alpha/'
    const [country, setCountry] = useState(state.country)
    const [borders, setBorders] = useState([])
    const [navLink, setNavLink] = useState();

    const getOneCountry = async (id) => {
        try {
            await axios.get(url + id).then(response => {
                setCountry(response.data[0])
                // console.log(response.data)
                // console.log("Above was from getOneCountry")
            });
        } catch (error) {
            console.error(error);
        }
    }

    const [bordersData, setBordersData] = useState([])
    const getCountry = async (id) => {
        try {
            await axios.get(url + id).then(response => {
                bordersData.push(response.data[0])
            });
        } catch (error) {
            console.error(error);
        }
    }

    const getBorder = async (arr) => {
        return await Promise.all(arr.borders.map(e => getCountry(e)))
    }


    console.log(params)

    console.log(navLink)
    console.log("navLnk before useEffect")
    useEffect(() => {
        console.log(navLink)
        getBorder(country)
        // country.borders.map((border) => getCountry(border))
    }, [navLink]);

    // useEffect(() => {
    //     getOneCountry(params.countryId);
    // }, [params])

    const getNestedValue = (object, key) => {
        const arrayVal = []
        const arrayDynamicKey = _.keys(object)
        const list = arrayDynamicKey.map((element) => {
            const value = _.get(object, [element, key])
            arrayVal.push(value)
        })
        return arrayVal
    }
    // Meant to be used for nested value in nested objects with dynamic keys
    // e.g: "currencies" : { "XPF": { name: franc, symbol: F },
    //                       "GBP": { name: pound, symbol: P }}
    // arrayDynamicKey would be ['XPF', 'GBP'], element would be XPF and so on,
    // key would be 'symbol', which means the value we're looking to extract is F, P.

    // let history = useHistory()

    // const goHomeBtn = () => history.push('/')

    console.log(country)
    console.log("heLlo" + country + "Test" + state)
    console.log(borders)
    console.log(bordersData)
    // console.log(state)

    return (
        <div className={darkMode ? 'details' : 'details dark'}>
            <NavigationBar />

            <DetailsHeader officialName={state.country.name.official} commonName={state.country.name.common} />

            <DetailsCard
                id={params.countryId}
                country={state.country}
                commonName={state.country.name.common}
                img={state.country.flags.png}
                borders={state.country.borders}
                nativeName={getNestedValue(state.country.name.nativeName, 'official').slice(0, 3).join(', ')}
                population={state.country.population.toLocaleString()}
                region={state.country.region}
                subRegion={state.country.subregion}
                tld={state.country.tld.join(', ')}
                currencies={getNestedValue(state.country.currencies, 'name').join(', ')}
                language={_.values(state.country.languages).join(', ')}
                capital={state.country.capital.join(', ')}
            />

            <Container className="container-3">
                {Object.hasOwn(state.country, 'borders') ?
                    <Card className="card-style">
                        <div className="below-card">
                            <p>Neighbouring countries </p>
                            {state.country.borders.map((element, idx) => {
                                const borderCountry = bordersData[_.findLastIndex(bordersData, {cca3: element})]
                                console.log("Container 3")
                                console.log(borderCountry)

                                return (
                                    // some const = array where bordersData[n].cca3 = element
                                    <div className="btn btn-secondary btn-sm" key={element}
                                        onClick={() => {
                                            navigate(`/details/${element}`, {state: { country: borderCountry }})
                                            setNavLink(`/details/${element}`)
                                            // navigate(navLink)
                                            // getOneCountry(element)
                                        }}>
                                        {element}
                                    </div>
                                )
                            })}
                        </div>
                    </Card>
                    : <></>
                }
            </Container>

        </div >
    );

}

export default Details;