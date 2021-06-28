import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";

class Register extends Component {
    constructor() {
        super()
        this.state = {
            firstname:'',
            lastname:'',
            username: '',
            phone: '',
            email: '',
            password: '',
            ktp:'',
            alamat:'',
            error: null,
            users: [],
            loading: false
        };
    }
    componentDidMount() {
        localStorage.clear()
    };


    handleOnchange = e => this.setState({ [e.target.name]: e.target.value });

    handleSignUp = event => {
        event.preventDefault()
        this.setState({ loading: true });
        const { firstname, lastname, username, ktp, phone, email, password, alamat } = this.state;
        if (!username.length || !ktp.length || !phone.length || !email.length || !password.length || !alamat.length) {
            this.setState({ error: "please fill out all the details", loading: false })
            return false;
        } else if (password.length < 6) {
            this.setState({ error: "password should contain atleast 6 charecters", loading: false })
            return false;
        } else {
            const regesterData = {
                firstname: firstname,
                lastname: lastname,
                username: username,
                ktp: ktp,
                phone: phone,
                email: email,
                password: password,
                alamat: alamat
            };

            this.setState({
                error: "",
                firstname:"",
                lastname:"",
                username: "",
                ktp: "",
                phone: "",
                email: "",
                password: "",
                alamat:"",
                users: this.state.users.concat(regesterData)
            });

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            // const json = JSON.stringify({
            //     "username": this.state.username,
            //     "": this.state.dataForm.noTelpKurir,
            //     "nik":this.state.dataForm.nik,
            //     "ttl":this.state.dataForm.ttl,
            //     "alamat":this.state.dataForm.alamat
            // });


            console.log(regesterData)

            axios.post("http://localhost:3333/register/create",regesterData, config)
                .then(res=>{
                    console.log(res)
                })

            setTimeout(() => {
                this.props.history.push("/")
                this.setState({ loading: false })
            }, 2000)
        }
    };


    render() {
        const { firstname, lastname, username, ktp, phone, email, password, error, alamat, loading } = this.state;

        return (
            <React.Fragment>
                <div className="container">
                    <div className="row pt-5">
                        <div className="col-lg-4"></div>
                        <div className="col-lg-4">
                            <div className="card card-body py-3 mb-3">
                                <div className="text-center mb-3"><i className="fa fa-user fa-2x text-primary"></i></div>
                                <h3 className="text-center mb-4">Sign up</h3>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <form onSubmit={this.handleSignUp}>
                                            <div className="form-group mb-3">
                                                <label className="font-weight-bold small" htmlFor="firstname">First Name:</label>
                                                <input
                                                    id="firstname"
                                                    type="text"
                                                    autoFocus
                                                    className="form-control"
                                                    placeholder="first name"
                                                    name="firstname"
                                                    onChange={this.handleOnchange}
                                                    value={firstname}
                                                />

                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="font-weight-bold small" htmlFor="lastname">Last Name:</label>
                                                <input
                                                    id="lastname"
                                                    type="text"
                                                    autoFocus
                                                    className="form-control"
                                                    placeholder="lastname"
                                                    name="lastname"
                                                    onChange={this.handleOnchange}
                                                    value={lastname}
                                                />

                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="font-weight-bold small" htmlFor="userName">User Name:</label>
                                                <input
                                                    id="userName"
                                                    type="text"
                                                    autoFocus
                                                    className="form-control"
                                                    placeholder="user name"
                                                    name="username"
                                                    onChange={this.handleOnchange}
                                                    value={username}
                                                />

                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="font-weight-bold small" htmlFor="lastName">Nomor KTP:</label>
                                                <input
                                                    id="ktp"
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="ktp"
                                                    name="ktp"
                                                    onChange={this.handleOnchange}
                                                    value={ktp}
                                                />

                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="font-weight-bold small" htmlFor="phoneNumber">Phone Number:</label>
                                                <input
                                                    id="phoner"
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="phone"
                                                    name="phone"
                                                    onChange={this.handleOnchange}
                                                    value={phone}
                                                />

                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="font-weight-bold small" htmlFor="email">Email address:</label>

                                                <input
                                                    type="email"
                                                    id="email"
                                                    className="form-control"
                                                    placeholder="email"
                                                    name="email"
                                                    onChange={this.handleOnchange}
                                                    value={email}
                                                />

                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="font-weight-bold small" htmlFor="email">Alamat:</label>

                                                <input
                                                    type="text"
                                                    id="alamat"
                                                    className="form-control"
                                                    placeholder="alamat"
                                                    name="alamat"
                                                    onChange={this.handleOnchange}
                                                    value={alamat}
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
                                                <button disabled={loading} className="btn btn-primary btn-block">SignUp</button>
                                            </div>
                                        </form>
                                        {error && <p className="text-danger mt-3 mb-2 text-center">{error}</p>}
                                    </div>
                                </div>
                            </div>
                            <div className="card card-footer">
                                <span className="text-center small">Have an account ? <Link to="/">Login</Link></span>
                            </div>
                        </div>
                    </div>
                    <br />
                </div>
            </React.Fragment>
        )
    }
}
export default Register;
