import React, {Component, Fragment} from 'react';
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import {Carousel} from "bootstrap-4-react/lib/components";
import {BImg} from "bootstrap-4-react/lib/components/dom";
import bg from '../img/1.jpg'
import bg2 from '../img/2.jpg'
import bg3 from '../img/5.jpg'
import utama from '../img/utama.png'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faChevronLeft,
    faChevronRight,
    faCogs,
    faGlobeAsia,
    faMapMarkedAlt,
    faTruck, faUserClock
} from "@fortawesome/free-solid-svg-icons";
import '../Style/Home.scss'
import {Link} from "react-router-dom";
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
                            <Carousel.Item active className="carousel-item carousel-item-1">
                                <BImg display="block" w="100" src={bg} />
                                <div className="carousel-caption">
                                    <h5>Express Your <br/>Online Bussines</h5>
                                    <p>Jasa pengiriman berbasis teknologi</p>
                                </div>
                            </Carousel.Item>
                            <Carousel.Item className="carousel-item carousel-item-2">
                                <BImg display="block" w="100" src={bg2} />
                                <div className="carousel-caption">
                                    <h5>YFA Express tetap <br/> layani pengiriman <br/> tanpa libur</h5>
                                    <p>lihat layanan</p>
                                    <Link to={"/layanan"}>
                                        <button className="btn btn-primary">Klik disini</button>
                                    </Link>
                                </div>
                            </Carousel.Item>
                            <Carousel.Item className="carousel-item carousel-item-3">
                                <BImg display="block" w="100" src={bg3} />
                                <div className="carousel-caption">
                                    <h5>INOVASI TANPA HENTI</h5>
                                    <p>Bersama kami #LebihDekatLebihMudah</p>
                                </div>
                            </Carousel.Item>
                        </Carousel.Inner>
                        <Carousel.Prev href="#carouselExampleControls">
                            <i className="fa-chevron-left" ><FontAwesomeIcon icon={faChevronLeft}/></i>
                        </Carousel.Prev>
                        <Carousel.Next href="#carouselExampleControls">
                            <i className="fa-chevron-right" ><FontAwesomeIcon icon={faChevronRight}/></i>
                        </Carousel.Next>
                    </Carousel>

                    {/*fitur-slider*/}
                    <div className="container-fitur">
                        <img src={utama} alt="peta indonesia"/>
                        <div className="carousel-absolute">
                            <div className="container owl-carousel owl-carousel-1">
                                <div className="fitur">
                                    <i className="fa fa-globe-asia">
                                        <FontAwesomeIcon icon={faGlobeAsia}/>
                                    </i>
                                    <p>Menjangkau seluruh Indonesia</p>
                                </div>
                                <div className="fitur">
                                    <i className="fa fa-map-marked-alt">
                                        <FontAwesomeIcon icon={faMapMarkedAlt}/>
                                    </i>
                                    <p>Sistem cek ongkir</p>
                                </div>
                                <div className="fitur">
                                    <i className="fa fa-cogs">
                                        <FontAwesomeIcon icon={faCogs}/>
                                    </i>
                                    <p>Operational 365 hari</p>
                                </div>
                                <div className="fitur">
                                    <i className="fa fa-truck">
                                        <FontAwesomeIcon icon={faTruck}/>
                                    </i>
                                    <p>Harga regular service premium</p>
                                </div>
                                <div className="fitur">
                                    <i className="fa fa-user-clock">
                                        <FontAwesomeIcon icon={faUserClock}/>
                                    </i>
                                    <p>24 jam layanan</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <Footer/>
            </Fragment>
        );
    }
}

export default Home;
