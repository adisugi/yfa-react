import React, {Component, Fragment} from 'react';
import pandu1 from "../img/pandu1.jpg";
import pandu2 from "../img/pandu2.jpg";
import pandu3 from "../img/pandu3.jpg";
import pandu4 from "../img/pandu4.jpg";
import pandu5 from "../img/pandu5.jpg";
import pandu6 from "../img/pandu6.jpg";
import Header from "../Components/Header";
import JumbotronKu from "../Components/JumbotronKu";
import bg from "../img/1.jpg";
import {Container, Row,Col} from "reactstrap";
import Footer from "../Components/Footer";
import "../Style/panduan.css";

class Panduan extends Component {
    render() {
        return (
            <Fragment>
                <Header bgNav={"#133671"}/>
                <JumbotronKu image={bg}
                             jumboAfter={'linear-gradient(to right, rgba(30,171,255,1), rgba(30,171,255,0) 70%)'}
                             title={'Panduan'}/>
                <main>
                    <Container className="lebar" style={{display: "flex", flexWrap: "wrap", justifyContent:"center"}}>
                        <Row>
                            <Col className="bungkus bg" style={{display: "flex", width: "100%"}}>
                                <div>
                                    <div className="kolomatas">
                                        <h5 className="text-center" style={{fontWeight:"Bold"}}>Cara Penempelan Label Pengiriman</h5>
                                    </div>
                                    <div className="kolombawah">
                                        <p>
                                            Jika pengirim menempelkan label pengiriman dari platform e-commerce,
                                            pastikan label pengirman di tempel pada permukaan yang rata, tidak
                                            terlipat dan tidak mengelembung.
                                        </p>
                                    </div>
                                </div>
                                <div className="image-center">
                                    <div className="aboutus"
                                         style={{
                                             background: `url(${pandu1})`,
                                             backgroundPosition: "center",
                                             backgroundSize: "contain",
                                             backgroundRepeat:"no-repeat",
                                             padding: "auto",
                                             margin: "auto"
                                         }}>
                                    </div>
                                </div>
                            </Col>
                            <Col className="bungkus bg" style={{display: "flex", width: "100%"}}>
                                <div>
                                    <div className="kolomatas">
                                        <h5 className="text-center" style={{fontWeight:"Bold"}}>Cara Packing Barang Besar dan Panjang</h5>
                                    </div>
                                    <div className="kolombawah">
                                        <p>
                                            Setiap barang yang dikirimkan lapisi barang dengan bubble wrap 3 sampai 5
                                            layer disesuaikan dengan kerentanan paket, Lakban dengan padat untuk
                                            menghindari goncangan.
                                        </p>
                                    </div>
                                </div>
                                <div className="image-center">
                                    <div className="aboutus"
                                         style={{
                                             background: `url(${pandu2})`,
                                             backgroundPosition: "center",
                                             backgroundSize: "contain",
                                             backgroundRepeat:"no-repeat",
                                             padding: "auto",
                                             margin: "auto"
                                         }}>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="bungkus bg" style={{display: "flex", width: "100%"}}>
                                <div>
                                    <div className="kolomatas">
                                        <h5 className="text-center" style={{fontWeight:"Bold"}}>Cara Packing Barang Elektronik</h5>
                                    </div>
                                    <div className="kolombawah">
                                        <p>
                                            Setiap barang yang dikirimkan pastikan memiliki kemasan luar atau kemasan
                                            commecial, Lapisi barang dengan bubble wrap, Sisipkan PE Foam di setiap
                                            sisi kardus untuk peredeam benturan, Pastikan ukuran barang sesuai dengan
                                            ukuran kardus.
                                        </p>
                                    </div>
                                </div>
                                <div className="image-center">
                                    <div className="aboutus"
                                         style={{
                                             background: `url(${pandu3})`,
                                             backgroundPosition: "center",
                                             backgroundSize: "contain",
                                             backgroundRepeat:"no-repeat",
                                             padding: "auto",
                                             margin: "auto"
                                         }}>
                                    </div>
                                </div>
                            </Col>
                            <Col className="bungkus bg" style={{display: "flex", width: "100%"}}>
                                <div>
                                    <div className="kolomatas">
                                        <h5 className="text-center" style={{fontWeight:"Bold"}}>Cara Packing Untuk Barang Cairan dan Pecah Belah</h5>
                                    </div>
                                    <div className="kolombawah">
                                        <p>
                                            Pastikan barang dikemas menggunakan kardus,
                                            Lapisi barang dengan bubble wrap 3-5 layer disesuaikan dengan kerentanan paket,
                                            Sisipkan PE Foam di setiap sisi kardus untuk peredeam benturan,
                                            Pastikan ukuran barang sesuai dengan ukuran kardus
                                        </p>
                                    </div>
                                </div>
                                <div className="image-center">
                                    <div className="aboutus"
                                         style={{
                                             background: `url(${pandu5})`,
                                             backgroundPosition: "center",
                                             backgroundSize: "contain",
                                             backgroundRepeat:"no-repeat",
                                             padding: "auto",
                                             margin: "auto"
                                         }}>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="bungkus bg" style={{display: "flex", width: "100%"}}>
                                <div>
                                    <div className="kolomatas">
                                        <h5 className="text-center" style={{fontWeight:"Bold"}}>Cara Penempelan Lakban</h5>
                                    </div>
                                    <div className="kolombawah">
                                        <p>
                                            Packing perlu dilakban dengan bentuk "#", Pastikan bahwa
                                            lakban tertempel secara erat dan tidak mengelembung
                                        </p>
                                    </div>
                                </div>
                                <div className="image-center">
                                    <div className="aboutus"
                                         style={{
                                             background: `url(${pandu4})`,
                                             backgroundPosition: "center",
                                             backgroundSize: "contain",
                                             backgroundRepeat:"no-repeat",
                                             padding: "auto",
                                             margin: "auto"
                                         }}>
                                    </div>
                                </div>
                            </Col>
                            <Col className="bungkus bg" style={{display: "flex", width: "100%"}}>
                                <div>
                                    <div className="kolomatas">
                                        <h5 className="text-center" style={{fontWeight:"Bold"}}>Informasi Ukuran Paket</h5>
                                    </div>
                                    <div className="kolombawah">
                                        <p>
                                            Ukuran paket harus lebih besar dari resi elektronik J&T Express (24 cm x 15 cm)
                                        </p>
                                    </div>
                                </div>
                                <div className="image-center">
                                    <div className="aboutus"
                                         style={{
                                             background: `url(${pandu6})`,
                                             backgroundPosition: "center",
                                             backgroundSize: "contain",
                                             backgroundRepeat:"no-repeat",
                                             padding: "auto",
                                             margin: "auto"
                                         }}>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                    </Container>

                </main>
                <Footer/>
            </Fragment>
        );
    }
}

export default Panduan;