import React, { Component } from "react";
import axios from 'axios';
import { Redirect } from 'react-router';
import { browserHistory } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { withRouter } from "react-router";





 class Header extends Component {

  constructor(props) {
    super(props);
    var date = new Date();
    

   

    this.onChangesearch = this.onChangesearch.bind(this);
    
   
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      
        search: '',
        ids: []
        
    }
    
}

onChangesearch(e) {
  const searchvalue = e.target.value;
  console.log(e.target.value)
  console.log("http://localhost:8080/Stock/readByName/"+e.target.value+"/");
  this.setState({
    
      search: e.target.value
  });
}

componentDidMount(prevProps, prevState){

  axios.get('http://localhost:8080/Stock/read/' + this.state.search)
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
    const { history } = this.props;
    history.push('/Stock/Home');
})
.catch(function (error) {
    console.log(error);
})

  
}
/* componentDidUpdate(prevProps, prevState) {

  const { history } = this.props;
  if (prevState.ids !== this.state.ids) {
    history.push('/Stock/Home');
  }

  } */

onSubmit(e) {
  alert('inside search submit');
  e.preventDefault();
  const sValue= this.state.search;
  const ids = 
        
  axios.get('http://localhost:8080/Stock/searchByName/'+sValue)
  .then(response => {
      this.componentDidMount()
      this.setState({ ids: response.data });
      
      console.log(this.state.ids)
      
  })
  .catch(function (error){
      console.log(error);
  })

  const { history } = this.props;
  
  history.push('/Stock/searchByName/'+sValue);
  
  
      
  this.setState({
      search: ''
  })


}



    render() {
      
      var style = {
        color :'green',
        fontSize: 200
      };
      const searchValue=this.state.search;
        return (
          
          <form onSubmit={this.onSubmit}>
            <div  className="navbar navbar-expand navbar-dark bg-dark static-top">

    <div  className="btn btn-link btn-sm text-white order-1 order-sm-0" style={style} id="sidebarToggle" href="#">
      <i  className="fas fa-bars"></i>
    </div>

    <a  className="navbar-brand mr-1" href="/">Stock Management</a>

    <div className="form-group d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
      
      <div  className="input-group">
      {/* <input type="text"  className="form-control" placeholder="Search for..." value={this.state.search} onChange={this.onChangesearch} required aria-label="Search" aria-describedby="basic-addon2"/> */}
        <div  className="form-group">
          
          <Button type="submit" value="Search Stock" href="/Stock/search" className="btn btn-primary" >Search Stock</Button>
          
        </div>
      </div>
      
    </div>
    

    

  </div>
  {/* {this.state.ids.length > 0 &&
  <Redirect to={{
    pathname: '/Stock/searchByName/'+searchValue,
    state: { results: this.state.ids }
  }}/>
} */}
  </form>


        );
 }
}

export default withRouter(Header);;
