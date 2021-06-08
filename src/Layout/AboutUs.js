import React, {Component, Fragment} from 'react';
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import bg from "../img/2.jpg"
import JumbotronKu from "../Components/JumbotronKu";

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
                <JumbotronKu image={bg}
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