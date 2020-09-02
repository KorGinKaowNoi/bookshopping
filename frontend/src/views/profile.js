import React, { Component } from 'react';
import Show from './showdata';
import axios from 'axios';

class Profile extends Component{

    constructor(props){
        super(props);
        this.state = {data:[]};
    }
   
    componentDidMount(){
        axios.get('http://localhost:8080/users/list')
        .then(res =>{
            this.setState({data:res.data});
            console.log(res.data);
        }).catch((err)=>{
            console.log(err);
        });
    }

    dataTable(){
        return this.state.data.map((data,i)=>{
            return <Show obj={data} key={i} />;
            
        });
    }
    
    render(){
        return(
            <div className="container">
                <div className='row'>
                    <div className='col-md-12 '>
                        <table className='table table-striped table-dark'>
                            <thead className='thead-dark'>
                                <tr>
                                    <td>ID</td>
                                    <td>Name</td>
                                    <td>nickname</td>
                                    <td>BirthDay</td>
                                </tr>
                            </thead>
                            <tbody>
                                {this.dataTable()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;