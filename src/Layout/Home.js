import React, {Component, Fragment} from 'react';
import Header from "../Components/Header";
import Footer from "../Components/Footer";

class Home extends Component {
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
        return (
            <Fragment>
                <Header bgNav={"#1EABFF"}/>


                <Footer/>
            </Fragment>
        );
    }
}

export default Home;
