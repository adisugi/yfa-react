import React, {Component, Fragment} from 'react';
import Header from "../Components/Header";
import Jumbo from "../Components/Jumbo";
import Footer from "../Components/Footer";
import bg from "../img/2.jpg"

class AboutUs extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <Fragment>
                <Header bgNav={"#1EABFF"}/>
                <Jumbo image={bg}
                       jumboAfter={'linear-gradient(to right, rgba(19,54,113,1), rgba(19,54,113,0) 70%)'}
                       title={'About Us'}/>
                <main>
                    About Us
                </main>
                <Footer />

            </Fragment>
        );
    }
}

export default AboutUs;