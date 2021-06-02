import React, {Component, Fragment} from 'react';
import Header from "../Components/Header";
import Jumbo from "../Components/Jumbo";
import Footer from "../Components/Footer";
import bg from "../img/1.jpg"

class DropOff extends Component {
    render() {
        return (
            <Fragment>
                <Header bgNav={"#133671"}/>
                <Jumbo image={bg}
                       jumboAfter={'linear-gradient(to right, rgba(30,171,255,1), rgba(30,171,255,0) 70%)'}
                       title={'Drop Off'}/>
                DropOff
                <Footer />

            </Fragment>
        );
    }
}

export default DropOff;