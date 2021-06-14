import React, {Component, Fragment} from 'react';
import "../Style/larangan.css";
import larangan1 from "../img/larangan1.jpg";
import larangan2 from "../img/larangan2.jpg";
import larangan3 from "../img/larangan3.jpg";
import larangan5 from "../img/larangan5.jpg";
import larangan6 from "../img/larangan6.jpg";
import larangan7 from "../img/larangan7.jpg";
import larangan8 from "../img/larangan8.jpg";
import larangan9 from "../img/larangan9.jpg";

import {
    Container, Row
} from "reactstrap";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import JumbotronKu from "../Components/JumbotronKu";
import bg from "../img/2.jpg";


class Larangan extends Component {
    render() {
        return (
            <Fragment>
                <Header bgNav={"#1EABFF"}/>
                <JumbotronKu image={bg}
                             jumboAfter={'linear-gradient(to right, rgba(19,54,113,1), rgba(19,54,113,0) 70%)'}
                             title={'Larangan'}/>
                <main>
                    <Container class="container">
                        <Row class="row">
                            <div class="bodynya row">
                                <div class="containersatu">
                                    <div class="box">
                                        <div class="imgBox">
                                            <img src={larangan9}/>
                                        </div>
                                        <div class="details">
                                            <div class="content">
                                                <h2>Organ</h2>
                                                <p>Berbagai barang yang dapat membahayakan kesehatan,
                                                    seperti tulang hewan atau anggota badan lainnya,
                                                    organ hewan, kulit binatang yang belum diproses,
                                                    dan tulang hewan tanpa atau sebelum diproses
                                                    dengan aman.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="box">
                                        <div class="imgBox">
                                            <img src={larangan1}/>
                                        </div>
                                        <div class="details">
                                            <div class="content">
                                                <h2>Senjata Api</h2>
                                                <p>Bahan mudah meledak seperti bahan peledak
                                                    & detonator, mesiu, petasan, dll.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="box">
                                        <div class="imgBox">
                                            <img src={larangan2}/>
                                        </div>
                                        <div class="details">
                                            <div class="content">
                                                <h2>Bahan Kimia</h2>
                                                <p>Semua jenis bahan korosif seperti
                                                    asam sulfat, asam klorida, asam nitrat,
                                                    pelarut organik, pestisida, hidrogen
                                                    peroksida, dan bahan kimia berbahaya lainnya.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="box">
                                        <div class="imgBox">
                                            <img src={larangan3}/>
                                        </div>
                                        <div class="details">
                                            <div class="content">
                                                <h2>Narkoba</h2>
                                                <p>Semua jenis obat-obatan narkotika seperti opium
                                                    (termasuk bunga, tunas dan daun opium), morn, kokain,
                                                    heroin, ganja, shabu, efedrin, dan produk-produk terkait
                                                    lainnya</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div class="containersatu">

                                    <div class="box">
                                        <div class="imgBox">
                                            <img src={larangan5}/>
                                        </div>
                                        <div class="details">
                                            <div class="content">
                                                <h2>Dilarang Hukum</h2>
                                                <p>Barang yang dilarang untuk diedarkan
                                                    sesuai dengan peraturan
                                                    negara seperti informasi
                                                    rahasia negara, mata uang, uang palsu,
                                                    senjata replika, senjata tajam,
                                                    hewan langka dan produk jadi.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="box">
                                        <div class="imgBox">
                                            <img src={larangan6}/>
                                        </div>
                                        <div class="details">
                                            <div class="content">
                                                <h2>Radioaktif</h2>
                                                <p>Berbagai jenis unsur radioaktif
                                                    dan penyimpanannya, seperti uranium,
                                                    kobalt, radium dan plutonium.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="box">
                                        <div class="imgBox">
                                            <img src={larangan7}/>
                                        </div>
                                        <div class="details">
                                            <div class="content">
                                                <h2>Bahan Mudah Terbakar</h2>
                                                <p>Semua jenis bahan yang mudah terbakar,
                                                    termasuk cairan, gas, bensin, minyak tanah, alkohol,
                                                    pernis, bahan bakar diesel, aerosol/tabung
                                                    semprot, korek api, korek api, dll</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="box">
                                        <div class="imgBox">
                                            <img src={larangan8}/>
                                        </div>
                                        <div class="details">
                                            <div class="content">
                                                <h2>Bahan Kemasan yang Tidak Pantas</h2>
                                                <p>Barang dengan kemasan yang tidak pantas,
                                                    yang bisa membahayakan, menyebabkan polusi,
                                                    atau barang yang dapat mencemari pengiriman
                                                    lainnya, parsial atau total.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Row>
                    </Container>
                </main>
                <Footer/>
            </Fragment>

        );
    }
}

export default Larangan;