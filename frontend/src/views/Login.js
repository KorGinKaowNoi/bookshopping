import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/login.css';
import axios from 'axios';
class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username:"",
            password:""
        };
        this.onLogin = this.onLogin.bind(this);
        this.getUsername = this.getUsername.bind(this);
        this.getPassword = this.getPassword.bind(this);
    }

    getUsername(evt){
        this.setState({username:evt.target.value});
    }

    getPassword(evt){
        this.setState({password:evt.target.value});
    }

    onLogin(){
        let data = {"username":this.state.username,"password":this.state.password};
        axios('http://localhost:8080/users/login',{
            method:'post',
            body:JSON.stringify(data)
        }).then(res =>{
                alert(res.json());
                return res.json(); 
            }).catch(err =>{
                throw err;
            });
    }

    render() {
        return (
            <div className="container">
                <div className='row'>
                    <div className='col-12'>
                        <div id="logreg-forms">
                            <form class="form-signin" method='POST' action='/login'>
                                <h1 class="h3 mb-3 font-weight-normal" className='OR'> Sign in</h1>
                                <div class="social-login">
                                    <button class="btn facebook-btn social-btn" type="button"><span><i class="fab fa-facebook-f"></i> Sign in with Facebook</span> </button>
                                    <button class="btn google-btn social-btn" type="button"><span><i class="fab fa-google-plus-g"></i> Sign in with Google+</span> </button>
                                </div>
                                <p className='OR'> OR  </p>
                                <input type="text" class="form-control" placeholder="username" required="" autofocus="" name='username'/>
                                <input type="password" class="form-control" placeholder="Password" required="" name='password'/>

                                <button class="btn btn-success btn-block" onClick={this.onLogin()}><i class="fas fa-sign-in-alt"></i> Login</button>
                                <a href="/forget">Forgot password?</a>
                                <hr />
                                <button class="btn btn-primary btn-block" type="button" id="btn-signup"><i class="fas fa-user-plus"></i> Sign up New Account</button>
                            </form>

                            <form action="/reset/password/" class="form-reset">
                                <input type="email" id="resetEmail" class="form-control" placeholder="Email address" required="" autofocus="" />
                                <button class="btn btn-primary btn-block" type="submit">Reset Password</button>
                                <a href="/reset"><i class="fas fa-angle-left"></i> Back</a>
                            </form>

                            <form action="/signup/" class="form-signup">
                                <div class="social-login">
                                    <button class="btn facebook-btn social-btn" type="button"><span><i class="fab fa-facebook-f"></i> Sign up with Facebook</span> </button>
                                </div>
                                <div class="social-login">
                                    <button class="btn google-btn social-btn" type="button"><span><i class="fab fa-google-plus-g"></i> Sign up with Google+</span> </button>
                                </div>

                                <p className='OR'>OR</p>

                                <input type="text" id="user-name" class="form-control" placeholder="Full name" required="" autofocus="" />
                                <input type="email" id="user-email" class="form-control" placeholder="Email address" required autofocus="" />
                                <input type="password" id="user-pass" class="form-control" placeholder="Password" required autofocus="" />
                                <input type="password" id="user-repeatpass" class="form-control" placeholder="Repeat Password" required autofocus="" />

                                <button class="btn btn-primary btn-block" type="submit"><i class="fas fa-user-plus"></i> Sign Up</button>
                                <a href="/cancel"><i class="fas fa-angle-left"></i> Back</a>
                            </form>
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;