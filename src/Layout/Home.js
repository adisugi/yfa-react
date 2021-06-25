import React, {Component, Fragment} from 'react';
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import {Carousel} from "bootstrap-4-react/lib/components";
import {BImg} from "bootstrap-4-react/lib/components/dom";
import bg from '../img/1.jpg'
import bg2 from '../img/2.jpg'
import bg3 from '../img/5.jpg'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import '../Style/Home.scss'
// import {carousel} from "bootstrap-4-react/src";

class Home extends Component {

    componentWillMount() {
        // window.setTimeout(() => carousel('#carouselExampleControls'), 2000);
    }

    render() {
        return (
            <Fragment>
                <Header bgNav={"#1EABFF"}/>
                <div>
                    <Carousel w="100" id="carouselExampleControls">
                        <Carousel.Inner>
                            <Carousel.Item active className="carousel-item carousel-item-1"><BImg display="block" w="100" src={bg} /></Carousel.Item>
                            <Carousel.Item className="carousel-item carousel-item-2"><BImg display="block" w="100" src={bg2} /></Carousel.Item>
                            <Carousel.Item className="carousel-item carousel-item-3"><BImg display="block" w="100" src={bg3} /></Carousel.Item>
                        </Carousel.Inner>
                        <Carousel.Prev href="#carouselExampleControls">
                            <i className="fa-chevron-left" ><FontAwesomeIcon icon={faChevronLeft}/></i>
                        </Carousel.Prev>
                        <Carousel.Next href="#carouselExampleControls">
                            <i className="fa-chevron-right" ><FontAwesomeIcon icon={faChevronRight}/></i>
                        </Carousel.Next>
                    </Carousel>
                </div>


                <Footer/>
            </Fragment>
        );
    }
}

export default Home;
