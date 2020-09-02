import React, { Component } from 'react';
import axios from 'axios';

class Store extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:"",
            nickname:"",
            birthday:""
        };
        this.getName = this.getName.bind(this);
        this.getNickName = this.getNickName.bind(this);
        this.getDate = this.getDate.bind(this);
        this.getData = this.getData.bind(this);
    }
    getName(evt){
        this.setState({name:evt.target.value});
    }
    getNickName(evt){
        this.setState({nickname:evt.target.value});
    }
    getDate(evt){
        this.setState({birthday:evt.target.value});
    }
    getData(){
        axios.post('http://localhost:8080/users/add',{
            name:`${this.state.name}`,
            nickname:`${this.state.nickname}`,
            birthday:`${this.state.birthday}`
        }).then((res)=>{
            alert(res);
        }).catch((err)=>{
            alert(err);
        });
        console.log(this.state.name + " " + this.state.nickname + " " + this.state.birthday);
    }
    render() {
        return (
            <div className="container">
                <div className='row'>
                    <div className='col-md-12'>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">First and last name and date</span>
                            </div>
                            <input type="text" className="form-control" onChange={this.getName} />
                            <input type="text" className="form-control" onChange={this.getNickName} />
                            <input type='date' className='form-control' onChange={this.getDate} />
                            <input type='button' value='submit' onClick={this.getData} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Store;