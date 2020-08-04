import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactDOM from 'react-dom';

import 'react-chat-widget/lib/styles.css';

const INC = props => (
    <tr>
        <td>
        <Link to={"/Stock/read/"+props.incKey.id}>{props.incKey.stockName}</Link>
        </td>
       
        {/* <td>dateFormat({props.incKey.INC_RaisedOn}, "dd-mm-yyyy")</td>  */}
        {/* <td><Moment format='DD-MM-YYYY'>{props.incKey.CreatedOn}</Moment></td> */}
        <td>{props.incKey.purchasingPrice}</td>
        <td>{props.incKey.quantity}</td>

        <td>
            <Link to={"/edit/" + props.incKey._id}>Edit</Link>
        </td>
    </tr>
)

export default class SearchStockFilter extends Component {

    constructor() {
        super();
        this.updateSearch=this.updateSearch.bind(this);
        this.state = { 
            incs: [],
            search:''  };
            
        


    }

    

    updateSearch(e){
        
        this.setState({
            search: e.target.value
            
        });
        
    }


    componentDidMount() {
        axios.get('http://localhost:8080/Stock/view')
            .then(response => {
                this.setState({ incs: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    /* todoList() {
        return this.state.incs.map(function (currentTodo, i) {
            return <INC incKey={currentTodo} key={i} />;
        })
    } */

    

    


    render() {


        

        let SearchINCs=this.state.incs.filter(
            (inc)=>{
                return inc.stockName.toString().toLowerCase().indexOf(this.state.search.toString().toLowerCase()) !== -1;
            }
        );


        return (
            

            <div>
                <h3>Welcom to Stock Search Exchange</h3>  <i class="fas fa-robot"></i>

                <div className="form-group">
                        <label>Search Filter : </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.search}

                            onChange={this.updateSearch}
                        />
                    </div>

                <div style={{ overflow: 'scroll', width: '100%', height: '550px' }}>
                <table className="table table-striped"  >
                    <thead>
                        <tr>
                        <th>Stock Name</th>
                            
                            <th>Purchasing Price </th> 
                           <th>Quantity </th>
                        </tr>
                    </thead>
                    <tbody>
                    {SearchINCs.map(function (currentTodo, i) {
            return <INC incKey={currentTodo} key={i} />;
        })}

                        
                    </tbody>
                </table>
                </div>
               
                
                
                
                

            </div>

            
        )
    }
}
