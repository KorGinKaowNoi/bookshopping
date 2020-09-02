import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Login from './Login';
import Register from './Register';
import Profile from './profile';
import Store from './store';
function Start(props) {
    if (props.allow) {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/profile">profile <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/mybook">mybook</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/store'>store</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link disabled" to='/logout'>logout</Link>
                        </li>
                    </ul>
                </div>
            </nav>

        );
    } else {
        return (
            <div className="container">
                <div className='row'>
                    <div className='col-md-12 offset-md-4'>
                        <div className="btn-group btn-group-lg" role="group" aria-label="...">
                            <Link to='/login'><button className='btn btn-success'>login</button></Link>
                            <Link to='/register'><button className='btn btn-warning'>register</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            allow:false,
            infomation:"",
        }
    }
    componentDidMount(){
        axios.get('http://localhost:8080/')
            .then(res=>{
                this.setState({allow:res.data[0]});
            }).catch((err)=>{
                console.log(err);
            })
    }
    render() {
        return (
            <Router>
                <Start allow={this.state.allow}/>
                <Switch>
                    <Route path='/login'>
                        <Login />
                    </Route>
                    <Route path='/register'>
                        <Register />
                    </Route>
                    <Route path='/profile'>
                        <Profile />
                    </Route>
                    <Route path='/store'>
                        <Store />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default App;
