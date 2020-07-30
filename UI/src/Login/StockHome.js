import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from "react-js-pagination";
import { Row , Button } from 'react-bootstrap';
import Moment from 'react-moment';
const ID = props => (
  
    <tr>
        <td>
        <Link to={"/Stock/read/"+props.incKey.id}>{props.incKey.stockName}</Link>
        </td>
       
        {/* <td>dateFormat({props.incKey.INC_RaisedOn}, "dd-mm-yyyy")</td>  */}
        {/* <td><Moment format='DD-MM-YYYY'>{props.incKey.CreatedOn}</Moment></td> */}
        <td>{props.incKey.purchasingPrice}</td>
        <td>{props.incKey.quantity}</td>
        
        
        <td>
            <Link to={"/Stock/edit/"+props.incKey.id}>Edit</Link>
        </td>
    </tr>
)


class StockHomePage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        currentPage: 1,
        todosPerPage: 10,
        activePage: 1,
        ids: []

      };
      this.handleClick = this.handleClick.bind(this);
    }
    
    componentDidMount() {
        axios.get('http://localhost:8080/Stock/view/')
            .then(response => {
                this.setState({ ids: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }
    componentDidUpdate() {
        axios.get('http://localhost:8080/Stock/view/')
            .then(response => {
                this.setState({ ids: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    todoList() {
        return this.state.ids.map(function(currentTodo, i){
            return <ID incKey={currentTodo} key={i} />;
        })
    }

    handleClick(event) {
      this.setState({
        currentPage: Number(event.target.id)
      });
    }

    handlePageChange(pageNumber) {
      console.log(`active page is ${pageNumber}`);
      this.setState({activePage: pageNumber});
    }
  
    render() {
      const { ids, currentPage, todosPerPage } = this.state;
  
      // Logic for displaying todos
      const indexOfLastTodo = currentPage * todosPerPage;
      const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
      const currentTodos = ids.slice(indexOfFirstTodo, indexOfLastTodo);
  
      const renderTodos = currentTodos.map((todo, i) => {
        return <ID incKey={todo} key={i} />;
      });
  
      // Logic for displaying page numbers
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(ids.length / todosPerPage); i++) {
        pageNumbers.push(i);
      }
      
      const renderPageNumbers = pageNumbers.map(number => {
        return (
          <Button variant="outline-primary"
            key={number}
            id={number}
            onClick={this.handleClick}
          >
            {number}
          </Button>
        );
      });
  
      return (
        <div>
          <h3>Active Stock Directory</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Stock Name</th>
                            
                             <th>Purchasing Price </th> 
                            <th>Quantity </th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        { renderTodos }
                    </tbody>
                </table>
          <ul id="page-numbers">
          <center>
      { renderPageNumbers }</center>
    
          </ul>
        </div>
      );
    }
  }
  
  
  export default StockHomePage
