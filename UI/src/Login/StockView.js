import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table'
import { Form, Container } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'react-moment';

export default class ReadStock extends Component {

    constructor(props) {
        super(props);
        

        this.state = {
            id:'',
            stockName:'',
            purchasingPrice:'',
            purchasingDate:'',
            stockNumber:'',
            quantity:'',
            ids: []
        }
    }
   

    componentDidMount() {
        axios.get('http://localhost:8080/Stock/read/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    ids:response.data,
                    id: response.data.id,
                    stockName: response.data.stockName,
                    stockNumber: response.data.stockNumber,
                    quantity: response.data.quantity,
                    purchasingDate: response.data.purchasingDate,
                    purchasingPrice: response.data.purchasingPrice
                                      
                });
                console.log(response.data.id)
                console.log(this.props.match.params.id); 
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    /* onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);

        console.log(`INC Priority: ${this.state.INC_Status}`);
        console.log(`INC Priority: ${this.state.INC_ImpactedApplications}`);
        console.log(`INC Priority: ${this.state.INC_AssignedTo}`);
        console.log(`INC Priority: ${this.state.INC_Priority}`);

        const INCs = {
            INC_Number: this.state.INC_Number,
            INC_Subject: this.state.INC_Subject,
            INC_RaisedOn: this.state.INC_RaisedOn,
            INC_ImpactedApplications: this.state.INC_ImpactedApplications,
            INC_Type: this.state.INC_Type,
            INC_Description: this.state.INC_Description,
            INC_AssignedTo: this.state.INC_AssignedTo,
            INC_Priority: this.state.INC_Priority,
            INC_Status: this.state.INC_Status,
            INC_ResolverGroup: this.state.INC_ResolverGroup,
            INC_RouteCause: this.state.INC_RouteCause
        }

        console.log(INCs);
        console.log('list of INC raised');
        axios.post('http://localhost:4000/incs/update/' + this.props.match.params.id, INCs)
            .then(res => console.log(res.data));

        this.props.history.push('/');




    } */

    render() {

        const idValue= this.state.id
        return (
           
            <div>
                   

                <div style={{ marginTop: 10 }} class='scrollbar scrollbar-primary' style={{ 'max-height': 'calc(100vh - 210px)', 'overflow': 'auto' }}>
                <h3>Stock Details </h3>
                
                
                    
                    
                    <div>
                        {
                            this.state.ids.map((skill) => {
                                return (
                                    <div>
                                        <Table striped bordered hover>

                                            <tr><td>Stock Name </td><td><b>{skill.stockName}</b></td></tr>
                                            <tr><td>Stock Number  </td><td> {skill.stockNumber}</td></tr>
                                            <tr><td>Quantity :  </td><td> {skill.quantity}</td></tr>
                                            <tr><td>Purchasing Date :  </td>
                                            <td><Moment format='DD-MM-YYYY'>{skill.purchasingDate}</Moment></td></tr>
                                            <tr><td>PurchasingPrice : </td><td>{skill.purchasingPrice}</td></tr>
                                        </Table>

                                    <Button variant="primary" href="/Stock/home">Go Back</Button>
                                    <Button variant="primary" href={"/Stock/edit/"+skill.id}>Update</Button>
                                    </div>
                                    
                            )})
                        }
                    </div>
                    </div>







                        




                    {/* <div className="form-group">
                        <label>Issue Current Status : </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.INC_Status}
                            onChange={this.onChangeINCStatus}
                        />
                    </div> */}


</div>
               
        )
    }
}
