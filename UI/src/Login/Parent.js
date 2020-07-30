import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Row, Col} from "react-bootstrap"
import Header from "./Header.js";
import NavMenuBar from "./NavMenuBar.js";

import Footer from "./Footer.js";
import FunctionalBar from "./FunctionalBar.js";



class Parent extends Component {
  render() {
    return (






      <Router>
        <Header></Header>

        <Row>
          <Col xs={2}><NavMenuBar></NavMenuBar></Col>
          <Col xs={10}>
            <FunctionalBar></FunctionalBar>
            
            </Col>
        </Row>

        <Footer></Footer> 
        

        
      </Router>
    );
  }
}

export default Parent;