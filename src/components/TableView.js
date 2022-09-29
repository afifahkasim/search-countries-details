import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import _ from "lodash";


function TableView(props) {
    return (
        <Container>
            <Table hover responsive>
                <thead>
                    <tr className="table-dark">
                        <th className="rounded-left"></th>
                        <th>Country</th>
                        <th>Population</th>
                        <th>Region</th>
                        <th>Capital</th>
                        <th className="rounded-right">Currency</th>
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
                                {name: ele, symbol: sym}
                            )
                        })

                        return (
                            <tr key={idx} className="rows">
                                <td><img className="img" src={element.flags.png}></img></td>
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
        </Container>

    );
}

export default TableView;