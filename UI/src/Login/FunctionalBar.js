import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button, Container } from 'react-bootstrap';
import StockAddDetails from "./StockAdd"
import StockHomePage from "./StockHome"
import ReadStock from "./StockView"
import SearchStock from "./StockSearch"
import StockUpdate from "./StockUpdate"
import StockSearchFilter from "./SearchStockFilter"

 class FunctionalBar extends Component {
    render() {
        return (
           <Router>
            <div className="container-fluid">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="https://codingthesmartway.com" target="_blank">
             
            </a>
            <Link to="/" className="navbar-brand">Stock Details Portal </Link>
            {/* <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/view" className="nav-link">View INC</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create INC</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/search" className="nav-link">Search INC</Link>
                </li>
              </ul>
            </div> */}
          </nav>
          <br/>

          <Route path="/" exact component={StockHomePage} />
          
          
          <Route path="/Stock/Add" component={StockAddDetails} />
          <Route path="/Stock/home" component={StockHomePage} />
          <Route path="/Stock/read/:id" component={ReadStock} /> 
          <Route path="/Stock/edit/:id" component={StockUpdate} />
          <Route path="/Stock/search" component={StockSearchFilter} />
          <Route path="/Stock/searchByName/:search" component={SearchStock} />
          
          

          


         
        </div>
        </Router>
        );
 }
}

export default FunctionalBar;
