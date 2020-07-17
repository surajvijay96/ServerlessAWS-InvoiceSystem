import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown, faImage, faMoneyCheckAlt, faSearchDollar } from '@fortawesome/free-solid-svg-icons'
import { MemoryRouter } from 'react-router-dom/cjs/react-router-dom.min';


class App extends Component{
    state = {
        isLoading : true,
        invoices : []
    }

    remove(id){
        console.log(id);
        let updatedInvoices = [...this.state.invoices].filter( i => i.Id !== id);
        this.setState({invoices : updatedInvoices});
    }

    // displayImage(Image){
    //     console.log("Images " + Image);
    //     return(<a href={Image}></a>);
    // }

    async componentDidMount(){
        const response = await fetch('https://o6vlluh1l8.execute-api.us-east-1.amazonaws.com/Dev');
        const body = await response.json();
        this.setState({ invoices : body , isLoading : false });    }
    
    render() { 
        const isLoading = this.state.isLoading;
        const allinvoices = this.state.invoices;

        if(isLoading)
            return (<div>
                Loading....
            </div>)


        let invoices = allinvoices.map( invoice =>
            <tr key = {invoice.Id}>
                <td> {invoice.Vendor} </td> 
                <td> {invoice.Amount} </td>
                <td> {invoice.Invoice} </td>
                <td> {invoice.Date} </td>
                <td> <Button className = "btn btn-lg btn-success" onClick={ () => this.remove(invoice.Id) }>     <FontAwesomeIcon icon={faThumbsUp} /> OK </Button></td>
                <td> <Button className = "btn btn-lg btn-danger" onClick={ () => this.remove(invoice.Id) }> <FontAwesomeIcon icon={faThumbsDown}/> NOK </Button></td>
                <td> <Button className = "btn btn-lg btn-info" onClick={ () => this.remove(invoice.Id) }> <FontAwesomeIcon icon={faMoneyCheckAlt}/> 50% </Button></td>
                <td> <Button className = "btn btn-lg btn-warning" onClick={ () => this.remove(invoice.Id) }> <FontAwesomeIcon icon={faSearchDollar}/> ?? </Button></td>
                <td> <MemoryRouter><Link to={String(invoice.Image)}> <Button className = "btn btn-lg btn-info" > <FontAwesomeIcon icon={faImage}/>  Image </Button> </Link> </MemoryRouter></td>
            </tr>
            )
 
        return(
            <div className = "container border border-secondary rounded center">
                <div className = "row">
                    <div className = "col-12">
                        <h4> Pending Invoices - ABC Company</h4>
                    </div>
                </div>
                <div className = "row">
                    <div className = ".col-xs-12 center text-center">
                        <Table dark responsive striped bordered hover>
                            <thead>
                                <tr>
                                    <th>  Vendor </th>
                                    <th>  Amount </th>
                                    <th>  Invoice # </th>
                                    <th>  Date </th>
                                    <th colSpan = "4">  Actions </th>
                                    <th> Image </th>
                                </tr>
                            </thead>

                            <tbody>
                                {this.state.invoices.length === 0 ? <td colSpan="9">All caught up...!</td> : invoices } 
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;