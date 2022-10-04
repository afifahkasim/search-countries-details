import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import SortArrow from './SortArrow'

import _ from "lodash";
import { useNavigate } from 'react-router-dom'
import { useContext } from "react"
import { ThemeContext } from '../styles/ThemeContext'

function TableView(props) {
    const { darkMode } = useContext(ThemeContext);
    const headerColumn = ['', 'Country', 'Population', 'Region', 'Capital', 'Currency']

    // Working, state passed as well.
    // Will leave this here for a bit for reference, need to try this for [country details --> neighbour country details] navigation
    const navigate = useNavigate()

    return (
        <Container className={darkMode ? 'table' : 'table dark'}>
            <Container className='sort-container'>
                <p>Found {props.array.length} countries</p>
            </Container>
            <Table hover responsive className={darkMode ? 'table-hover' : 'table-hover dark'}>
                <thead>
                    <tr className="table-dark">
                        {headerColumn.map((element, idx) => {
                            if (idx === 0) // First column
                                return <th className="rounded-left" key={idx}>{element}</th>
                            else if (idx === headerColumn.length - 1) // Last column
                                return <th className="rounded-right" key={idx}>{element}</th>
                            else
                                return <th key={idx} style={{cursor: 'pointer'}} onClick={props.onClickHeader}>{element}
                                {(props.selectedColumn === null || props.selectedColumn !== element) && <SortArrow direction={null} />} 
                                {props.selectedColumn === element && <SortArrow direction={props.direction} />}</th>
                        })}
                    </tr>
                </thead>
                <tbody className='align-middle'>
                    {/* for testing */}
                    {/* {props.array.map((element, index) => {
                        console.log(_.keys(element.currencies))
                        console.log(_.head(_.keys(element.currencies)))
                        const xy = _.head(_.keys(element.currencies))
                        console.log(element.currencies)
                        console.log(_.get(element.currencies, [xy, 'symbol']))
                    })} */}
                    {props.array.map((element, idx) => {
                        const currencyList = _.keys(element.currencies)
                        const list = currencyList.map((ele) => {
                            const sym = _.get(element.currencies, [ele, 'symbol'])
                            return (
                                { name: ele, symbol: sym }
                            )
                        })

                        return (
                            // <tr key={idx} className="rows" onClick={handleClick(element, idx)}>
                            <tr key={idx} className="rows" onClick={() => navigate(`/details/${element.cca3}`, { state: { country: element } })}>
                                <td><img className="img" alt={`National Flag for ${element}`} src={element.flags.png}></img></td>
                                <td>{element.name.common}</td>
                                <td>{element.population.toLocaleString()}</td>
                                <td>{element.region}</td>
                                <td>{element.capital}</td>
                                <td>{list.map((e) => (<span className="currency">{e.symbol} {e.name} </span>))}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </Container >

    );
}

export default TableView;