import React, {Component, Fragment} from 'react';
import Header from "../Components/Header";
import Footer from "../Components/Footer";

class Home extends Component {
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