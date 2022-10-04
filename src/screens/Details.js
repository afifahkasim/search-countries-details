import { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation, useParams } from 'react-router'
import _ from "lodash";
import axios from 'axios'
import { ThemeContext } from '../styles/ThemeContext'

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

import NavigationBar from "../components/NavigationBar";
import DetailsHeader from "../components/DetailsHeader";
import DetailsCard from "../components/DetailsCard";


function Details() {
    const { darkMode } = useContext(ThemeContext);

    let params = useParams()
    let { state } = useLocation()
    let navigate = useNavigate()

    const url = 'https://restcountries.com/v3.1/alpha/'

    const [country, setCountry] = useState(state.country)
    const [borders, setBorders] = useState([])
    const [navLink, setNavLink] = useState();
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

    useEffect(() => {
        const getBorders = async () => {
          await Promise.all(country.borders.map((border) => getCountry(border)))
          setBorders(bordersData);
        };
        getBorders();
      }, [navLink]
    );

    // console.log("State and country: ")
    // console.log(state)
    // console.log(country)

    // console.log("Params: ")
    // console.log(params)

    // console.log("NavLink: ")
    // console.log(navLink)

    const getNestedValue = (object, key) => {
        const arrayVal = []
        const arrayDynamicKey = _.keys(object)
        arrayDynamicKey.map((element) => {
            const value = _.get(object, [element, key])
            arrayVal.push(value)
        })
        return arrayVal
    }
    // getNestedValue(object, key) is meant to be used for nested value in nested objects with dynamic keys
    // e.g: "currencies" : { "XPF": { name: franc, symbol: F },
    //                       "GBP": { name: pound, symbol: P }}
    // arrayDynamicKey would be ['XPF', 'GBP'], element would be XPF and so on,
    // key would be 'symbol', which means the value we're looking to extract is F, P.


    return (
        <div className={darkMode ? 'details' : 'details dark'}>
            <NavigationBar />

            <DetailsHeader officialName={country.name.official} commonName={country.name.common} />

            <DetailsCard
                id={params.countryId}
                country={country}
                commonName={country.name.common}
                img={country.flags.png}
                borders={country.borders}
                nativeName={getNestedValue(country.name.nativeName, 'official').slice(0, 3).join(', ')}
                population={country.population.toLocaleString()}
                region={country.region}
                subRegion={country.subregion}
                tld={country.tld.join(', ')}
                currencies={getNestedValue(country.currencies, 'name').join(', ')}
                language={_.values(country.languages).join(', ')}
                capital={country.capital.join(', ')}
            />

            <Container className="container-3">
                {Object.hasOwn(country, 'borders') ?
                    <Card className="card-style">
                        <div className="below-card">
                            <p>Neighbouring countries </p>
                            {country.borders.map((element, idx) => {
                                const borderCountry = bordersData[_.findLastIndex(bordersData, {cca3: element})]
                                console.log("borderCountry: ")
                                console.log(borderCountry)

                                return (
                                    <div className="btn btn-secondary btn-sm" key={element}
                                        onClick={() => {
                                            navigate(`/details/${element}`, {state: {country: borderCountry}})
                                            setNavLink(`/details/${element}`)
                                            setCountry(borderCountry)
                                            setBordersData([])
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