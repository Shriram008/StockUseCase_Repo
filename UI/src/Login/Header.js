import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button } from 'react-bootstrap';





 class Header extends Component {
    render() {

      var style = {
        color :'green',
        fontSize: 200
      };

        return (
            <div  className="navbar navbar-expand navbar-dark bg-dark static-top">

    <div  className="btn btn-link btn-sm text-white order-1 order-sm-0" style={style} id="sidebarToggle" href="#">
      <i  className="fas fa-bars"></i>
    </div>

    <a  className="navbar-brand mr-1" href="/">Stock Management</a>

    <div className="form-group d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
      <div  className="input-group">
        <input type="text"  className="form-control" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2"/>
        <div  className="input-group-append">
          <button  type='submit' className="btn btn-primary" type="button" value='Search'>
            <i  className="fas fa-search">Search</i>
          </button>
        </div>
      </div>
    </div>

    <ul  className="navbar-nav ml-auto ml-md-0">
      <li  className="nav-item dropdown no-arrow mx-1">
        <a  className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i  className="fas fa-bell fa-fw"></i>
          <span  className="badge badge-danger">9+</span>
        </a>
        <div  className="dropdown-menu dropdown-menu-right" aria-labelledby="alertsDropdown">
          <a  className="dropdown-item" href="#">Action</a>
          <a  className="dropdown-item" href="#">Another action</a>
          <div  className="dropdown-divider"></div>
          <a  className="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
      <li  className="nav-item dropdown no-arrow mx-1">
        <a  className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i  className="fas fa-envelope fa-fw"></i>
          <span  className="badge badge-danger">7</span>
        </a>
        <div  className="dropdown-menu dropdown-menu-right" aria-labelledby="messagesDropdown">
          <a  className="dropdown-item" href="#">Action</a>
          <a  className="dropdown-item" href="#">Another action</a>
          <div  className="dropdown-divider"></div>
          <a  className="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
      <li  className="nav-item dropdown no-arrow">
        <a  className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i  className="fas fa-user-circle fa-fw"></i>
        </a>
        <div  className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
          <a  className="dropdown-item" href="#">Settings</a>
          <a  className="dropdown-item" href="#">Activity Log</a>
          <div  className="dropdown-divider"></div>
          <a  className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">Logout</a>
        </div>
      </li>
    </ul>

  </div>
        );
 }
}

export default Header;
