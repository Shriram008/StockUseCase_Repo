import React, { Component } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { Form, Container } from 'react-bootstrap';
import Moment from 'react-moment';

export default class StockAddDetails extends Component {

    constructor(props) {
        super(props);
        var date = new Date();
        

       
    
        this.onChangepurchasingDate = this.onChangepurchasingDate.bind(this);
        this.onChangepurchasingPrice = this.onChangepurchasingPrice.bind(this);
        this.onChangestockName = this.onChangestockName.bind(this);
        this.onChangequantity = this.onChangequantity.bind(this);
        this.onChangestockNumber =  this.onChangestockNumber.bind(this);
       
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
          
            stockName: '',
            stockNumber: '',
            purchasingDate: '',
            purchasingPrice: '',
            quantity: ''
            
        }
        
    }

       

    
    onChangepurchasingDate(e) {
        this.setState({
            purchasingDate: e.target.value
        });
    }

    
     onChangepurchasingPrice(e) {
        console.log('inside onchange purchasingPrice '+ e.target.value)
        this.setState({
            purchasingPrice: e.target.value
        });
    }
    onChangestockName(e) {
        this.setState({
            stockName: e.target.value
        });
    }

    onChangequantity(e) {
        this.setState({
            quantity: e.target.value
        });
    }

    onChangestockNumber(e) {
        this.setState({
            stockNumber: e.target.value
        });
    }
    

    componentDidMount() {
        axios.get('http://localhost:4000/ids/count')
            .then(response => {
                
                this.setState({ 
                    count: response.data+1
                    
                });
                console.log(this.state.count)
            })
            .catch(function (error){
                console.log(error);
            })
    }

    onSubmit(e) {
        e.preventDefault();

        

        const IDs = {
            stockName : this.state.stockName,
            purchasingDate:  this.state.purchasingDate ,
            purchasingPrice: this.state.purchasingPrice,
            quantity: this.state.quantity,
            stockNumber: this.state.stockNumber
        }

        console.log(IDs)  ;          
        axios.post('http://localhost:8080/Stock/signup/', IDs)
            .then(res => console.log(res.data));

            this.props.history.push('/Stock');
            
        this.setState({
            stockName: '',
            stockNumber: '',
            purchasingDate: '',
            purchasingPrice: '',
            quantity: ''
        })


    }

    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3>Stock Add Portal  </h3>
                <form onSubmit={this.onSubmit}>

                

                    
                    <div className="form-group">
                        <label>Stock Number: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.stockNumber}
                            onChange={this.onChangestockNumber} required
                        />
                    </div>


                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <label>Purchasing Date : </label>
                        </div>
                        <input type="date"
                            className="form-control"
                            value={this.state.purchasingDate}
                            onChange={this.onChangepurchasingDate} required
                        />
                    </div>

                    <div className="form-group">
                        <label>Purchasing Price   </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.purchasingPrice}
                            onChange={this.onChangepurchasingPrice} required
                        />
                    </div>

                    <div className="form-group">
                        <label>Stock Name  </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.stockName}
                            onChange={this.onChangestockName} required
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
                        <input type="submit" value="Create Stock" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

