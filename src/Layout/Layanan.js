import React, {Component, Fragment} from 'react';
import Header from "../Components/Header";
import Jumbo from "../Components/Jumbo";
import CardLayanan from "../Components/CardLayanan";
import Footer from "../Components/Footer";
import bg from "../img/1.jpg"
import {Container} from "bootstrap-4-react";

const cardStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
}

class Layanan extends Component {
    render() {
        return (
            <Fragment>
                <Header bgNav={"#133671"}/>
                <Jumbo image={bg}
                       jumboAfter={'linear-gradient(to right, rgba(30,171,255,1), rgba(30,171,255,0) 70%)'}
                       title={'Layanan'}/>
                <main>
                   <Container style={cardStyle}>
                       {[1,2,3].map((card, index) => (
                           <CardLayanan key={index}/>
                       )) }
                   </Container>
                </main>
                <Footer />
            </Fragment>
        );
    }
}

export default Layanan;