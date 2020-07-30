import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import axios from 'axios';
import { Form, Container } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import * as moment from 'moment';
import Moment from 'react-moment';

export default class StockUpdate extends Component {

    constructor(props) {
        super(props);
        var date = new Date();
        

       
    
        this.onChangequantity = this.onChangequantity.bind(this);
        this.onChangepurchasingDate = this.onChangepurchasingDate.bind(this);
        this.onChangestockName = this.onChangestockName.bind(this);
        this.onChangepurchasingPrice = this.onChangepurchasingPrice.bind(this);
        this.onChangestockNumber =  this.onChangestockNumber.bind(this);
       
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
          
            stockName: '',
            stockNumber: '',
            quantity: '',
            purchasingDate: '',
            purchasingPrice: '',
            ids:[]
            
        }
    }

   

    onChangequantity(e) {
        this.setState({
            quantity: e.target.value
        });
    }

    
     onChangepurchasingDate(e) {
        console.log('inside onchange purchasingDate '+ e.target.value)
        this.setState({
            purchasingDate: e.target.value
        });
    }
    onChangestockName(e) {
        this.setState({
            stockName: e.target.value
        });
    }

    onChangepurchasingPrice(e) {
        this.setState({
            purchasingPrice: e.target.value
        });
    }

    onChangestockNumber(e) {
        this.setState({
            stockNumber: e.target.value
        });
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
                console.log(response.data.purchasingDate)
                console.log(this.props.match.params.id); 

                this.state.ids.map((skill) => {
                    this.setState({
    
                        id: skill.id,
                        stockName: skill.stockName,
                        stockNumber: skill.stockNumber,
                        quantity: skill.quantity,
                        purchasingDate: moment(skill.purchasingDate).format('YYYY-MM-DD'),
                        purchasingPrice: skill.purchasingPrice
                    })
    
                    console.log(Moment(this.state.purchasingDate).format('DD-MM-YYYY')) 
                })
                
            })
            .catch(function (error) {
                console.log(error);
            })

            {
                

                console.log(this.state.id)
            }

    }

    onSubmit(e) {
        e.preventDefault();

        this.setState ({
            INC_UpdatedOn: new Date()
        });
            
        
        console.log(`Form submitted:`);

        console.log(`INC Priority: ${this.state.INC_Status}`);
        console.log(`INC Priority: ${this.state.INC_ImpactedApplications}`);
        console.log(`INC Priority: ${this.state.INC_AssignedTo}`);
        console.log(`INC Priority: ${this.state.INC_Priority}`);
        console.log(`INC update: ${this.state.INC_UpdatedOn}`);

        const INCs = {
            stockName : this.state.stockName,
            quantity:  this.state.quantity ,
            purchasingDate: this.state.purchasingDate,
            purchasingPrice: this.state.purchasingPrice,
            stockNumber: this.state.stockNumber
        }

        console.log(INCs);
        console.log('list of INC raised');
        axios.post('http://localhost:8080/Stock/edit/' + this.props.match.params.id, INCs)
            .then(res => console.log(res.data));

        this.props.history.push('/Stock/home');




    }

    render() {

        const yourDate = new Date()
        const NewDate = moment(yourDate).format('DD-MM-YYYY')
        console.log(yourDate);
        console.log(NewDate);
        

        return (


            <div style={{ marginTop: 10 }}>
                <h3>Sign Up Portal  </h3>
                <form onSubmit={this.onSubmit}>

                
                <div className="form-group">
                        <label>StockName  </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.stockName}
                            onChange={this.onChangestockName} readOnly
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Stock Number: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.stockNumber}
                            onChange={this.onChangestockNumber} required
                        />
                    </div>

                    <div className="form-group">
                        <label>Quantity  </label>
                        <input type="quantity"
                            className="form-control"
                            value={this.state.quantity}
                            onChange={this.onChangequantity} required
                        />
                    </div>
                    
                    

                    <div className="form-group">
                        <label>Purchasing Date   </label>
                        <input type="Date"
                            
                            className="form-control"
                            value={this.state.purchasingDate}
                            defaultValue={this.state.purchasingDate}
                            onChange={this.onChangepurchasingDate} required
                        />
                    </div>

                    

                    <div className="form-group">
                        <label>purchasingPrice  </label>
                        <input type="purchasingPrice"
                            className="form-control"
                            value={this.state.purchasingPrice}
                            onChange={this.onChangepurchasingPrice} required
                        />
                    </div>

                     

                    <div className="form-group">
                        <input type="submit" value="Update Stock Details" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}