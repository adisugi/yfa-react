import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from "axios";
import AlertKu from "../Components/AlertKu";
import decode from "jwt-decode";

export default class Login extends Component {
    state = {
        username: "",
        password: "",
        error: null,
        users: null,
        errmessage: "",
        isAlert: false,
    };

    // componentDidMount() {
    // }

    handleOnchange = e => this.setState({ [e.target.name]: e.target.value });

    handleSignUp = event => {
        event.preventDefault()

        this.setState({
            isAlert:false
        })

        const { username, password, users } = this.state;
        // const formLogin = new FormData();

        const param = new URLSearchParams()
        param.append("username", username)
        param.append("password", password)

        // const formLogin = JSON.stringify({
        //     "username":email,
        //     "password":password
        // })

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        console.log(param)
        axios.post("http://localhost:3333/auth/token",param, config)
            .then(res=> {
                localStorage.setItem("access_token", res.data.data.access_token)
                const userData = decode(res.data.data.access_token)
                localStorage.setItem("email", userData.email)
                localStorage.setItem("username", userData.preferred_username)
                this.props.history.push("/Home");
                window.location.reload();
            })
            .catch(err=>{
                this.setState({
                    errmessage:err.response.data.message,
                    isAlert:true
                })
            })





        // if (!email.length || !password.length) {
        //     this.setState({ error: "please fill out all the details" })
        //     return false;
        // } else {
        //     users ? users.filter(user => {
        //         if (user.email !== email || user.password !== password) {
        //             this.setState({ error: "Invalid creadetials" })
        //         } else {
        //             const json = JSON.stringify(user);
        //             localStorage.setItem("currentUser", json);
        //             this.props.history.push("/Home");
        //             window.location.reload();
        //         }
        //     }) : this.setState({ error: "no user found" })
        // }
    };

    handleClear() {
        localStorage.clear()
    }




    render() {
        const { username, password, error } = this.state;
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row pt-5">
                        <div className="col-lg-4"></div>
                        <div className="col-lg-4">
                            <div className="card card-body py-3 mb-3">
                                <div className="text-center mb-3"><i className="fa fa-user fa-2x text-primary"></i></div>
                                <h3 className="text-center mb-4">Sign In</h3>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <form onSubmit={this.handleSignUp}>

                                            <div className="form-group mb-3">
                                                <label className="font-weight-bold small" htmlFor="email">Email address:</label>

                                                <input
                                                    // type="email"
                                                    id="email"
                                                    className="form-control"
                                                    placeholder="email"
                                                    name="username"
                                                    onChange={this.handleOnchange}
                                                    value={username}
                                                />

                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="font-weight-bold small" htmlFor="password">Password:</label>

                                                <input
                                                    id="password"
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="password"
                                                    name="password"
                                                    autoComplete=''
                                                    onChange={this.handleOnchange}
                                                    value={password}
                                                />
                                            </div>
                                            <div className="text-center">
                                                <button className="btn btn-primary btn-block">SignIn</button>
                                            </div>
                                        </form>
                                        {error && <p className="text-danger mt-3 mb-2 text-center">{error}</p>}
                                    </div>
                                </div>
                            </div>
                            <div className="card card-footer">
                                <span className="text-center small">Not have an account ? <Link to="/Register">Register</Link></span>
                            </div>
                            <button className="btn btn-primary btn-block" onClick={()=>this.handleClear()}>Clear</button>
                            <AlertKu isAlert={this.state.isAlert}
                                     alertMessage={this.state.errmessage}
                            />
                        </div>
                    </div>
                    <br />
                </div>
            </React.Fragment>
        )
    }
}
