import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Register extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            phoneNumber: '',
            email: '',
            password: '',
            error: null,
            users: [],
            loading: false
        };
    }
    componentDidMount() {
        try {
            const json = localStorage.getItem("users")
            const users = JSON.parse(json);
            if (users) {
                this.setState(() => ({ users }))
            }
        } catch (e) {
        }
    };

    componentDidUpdate(prevState, preProps) {
        if (preProps.users.length !== this.state.users.length) {
            const json = JSON.stringify(this.state.users);
            localStorage.setItem("users", json);
        }
    }

    handleOnchange = e => this.setState({ [e.target.name]: e.target.value });

    handleSignUp = event => {
        event.preventDefault()
        this.setState({ loading: true });
        const { firstName, lastName, phoneNumber, email, password } = this.state;
        if (!firstName.length || !lastName.length || !phoneNumber.length || !email.length || !password.length) {
            this.setState({ error: "please fill out all the details", loading: false })
            return false;
        } else if (password.length < 6) {
            this.setState({ error: "password should contain atleast 6 charecters", loading: false })
            return false;
        } else {
            const regesterData = {
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                email: email,
                password: password
            };

            this.setState({
                error: "",
                firstName: "",
                lastName: "",
                phoneNumber: "",
                email: "",
                password: "",
                users: this.state.users.concat(regesterData)
            });
            setTimeout(() => {
                this.props.history.push("/")
                this.setState({ loading: false })
            }, 2000)
        }
    };


    render() {
        const { firstName, lastName, phoneNumber, email, password, error, loading } = this.state;

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
                                                <label className="font-weight-bold small" htmlFor="firstName">Firest Name:</label>
                                                <input
                                                    id="firstName"
                                                    type="text"
                                                    autoFocus
                                                    className="form-control"
                                                    placeholder="first name"
                                                    name="firstName"
                                                    onChange={this.handleOnchange}
                                                    value={firstName}
                                                />

                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="font-weight-bold small" htmlFor="lastName">Last Name:</label>
                                                <input
                                                    id="lastName"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="last name"
                                                    name="lastName"
                                                    onChange={this.handleOnchange}
                                                    value={lastName}
                                                />

                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="font-weight-bold small" htmlFor="phoneNumber">Phone Number:</label>
                                                <input
                                                    id="phoneNumber"
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="phone number"
                                                    name="phoneNumber"
                                                    onChange={this.handleOnchange}
                                                    value={phoneNumber}
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
