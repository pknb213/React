import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import '../../app/App.css'
import {Img} from "./Image";
import Input from './Input';
import {PText} from "./Text";
import Checkbox from '../Login/CheckBox';
import LoginCheck from '../Login/LoginCheck';
import email from "../../resources/icon-email.png";
import pwd from "../../resources/icon-key.png";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pwd: '',
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePwdChange = this.handlePwdChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange = (e) => {
        this.setState({
            email: e.target.value
        })
    };

    handlePwdChange = (e) => {
        this.setState({
            pwd: e.target.value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        console.log(this.state);

        Axios.post('http://localhost:4000', this.state)
            .then(res => {
                console.log(res);
                if (res.data === "Hello World!"){
                    console.log("Hell");
                    // document.location.href = 'http://localhost:4000/test';
                    document.location.replace("http://localhost:4000/test");
                }
            })
            .catch(err => {
               alert(err);
            });
    };

    render() {
        return (
            <form id='form' onSubmit={this.handleSubmit}>
                <div className="EmailBox">
                    <Img id="EmailIcon" src={email}/>
                    <Input type="text" name="EmailText" text="E-mail" value={this.state.email} onChange={this.handleEmailChange}/>
                </div>
                <div className="PwdBox">
                    <Img id="PwdIcon" src={pwd}/>
                    <Input type="password" name="PwdText" text="Password" value={this.state.pwd} onChange={this.handlePwdChange}/>
                </div>
                <button className="LoginBtn" type="submit">
                    <PText id="Submit" text="Login"/>
                </button>
                <div className="Footer">
                    <Checkbox id="CheckBox"/>
                    <a href={"./#"}><PText id="RememberMe" text="Remember me"/></a>
                    <a href={"./#"}><PText id="Forgot" text="Forgot Password?"/></a>
                    <PText id="Bar" text="  |   "/>
                    <a href={"./#"}><PText id="Register" text="Register"/></a>
                </div>
            </form>
        );
    }

}

export default Login;