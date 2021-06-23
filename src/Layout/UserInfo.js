import React, { Component } from 'react'

export default class Dashboard extends Component {
  state = {
    currentUser: null
  }
  componentDidMount() {
    this.setCurrentUser()
  }
  setCurrentUser = () => {
    const user = localStorage.getItem("currentUser");
    this.setState({ currentUser: JSON.parse(user) })
  }
  render() {
    const { currentUser } = this.state;
    return (
      <React.Fragment >
        <div className="container">
          <h1 className="text-center mt-4">Dashboard</h1>
          {currentUser && (
            <div className="row">
              <div className="col-lg-4"></div>
              <div className="col-lg-4">
                <div className="card card-body">
                  <ul>
                    <li><b>First Name:</b> {currentUser.firstName}</li>
                    <li><b>Last Name:</b> {currentUser.lastName}</li>
                    <li><b>Email:</b> {currentUser.email}</li>
                    <li><b>PhoneNumber:</b> {currentUser.phoneNumber}</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
    )
  }
}
