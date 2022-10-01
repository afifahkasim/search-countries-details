import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from 'react-router'
import _ from "lodash";
import axios from 'axios'
import fetch from "isomorphic-unfetch";
import { getAllCountries } from "./Home"

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import NavigationBar from "../components/NavigationBar";
import DetailsHeader from "../components/DetailsHeader";
import DetailsCard from "../components/DetailsCard";


function Details() {
    let params = useParams()
    let { state } = useLocation()
    let navigate = useNavigate()

    console.log(state.country.cca3)
    const url = 'https://restcountries.com/v3.1/alpha/'
    const [country, setCountry] = useState(state.country)
    const [borders, setBorders] = useState([])
    const [navLink, setNavLink] = useState(`/details/${state.country.cca3}`);

    const getOneCountry = async (id) => {
        try {
            await axios.get(url + id).then(response => {
                setCountry(response.data[0])
                console.log(response.data)
                console.log("Above was from getOneCountry")
            });
        } catch (error) {
            console.error(error);
        }
    }

    const getCountry = async (id) => {
        const data = await axios.get(url + id).data
        console.log(data)
        console.log("Above was from getCountry")
        return data
    }

    console.log(params)

    useEffect(() => {
        const getBorders = async () => {
          const borders = await Promise.all(
            country.borders.map((border) => getOneCountry(border))
          );
          setBorders(borders);
        };
        getBorders();
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
    // console.log(state)

    return (
        <div className='details'>
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

            {Object.hasOwn(state.country, 'borders') ?
                <Container className="container-3">
                    <Card className="card-style">
                        <div className="below-card">
                            <p>Neighbouring countries </p>
                            {state.country.borders.map((element, idx) => {
                                return (
                                        <div className="btn btn-secondary btn-sm" key={element}
                                            onClick={() => {
                                                // setNavLink(`/details/${element}`)
                                                // navigate(navLink)
                                                // getOneCountry(element)
                                            }}>
                                            {element}
                                        </div>
                                )
                            })}
                        </div>
                    </Card>
                </Container>
                : <></>
            }


        </div >
    );

}

export default Details;