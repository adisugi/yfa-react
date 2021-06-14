import React, {Component, Fragment} from 'react';
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import bg from "../img/2.jpg"
import JumbotronKu from "../Components/JumbotronKu";
import "../Style/profilperusahaan.css";
import profil1 from "../img/delivery1.jpg";
import profil2 from "../img/delivery2.jpg";
import profil3 from "../img/delivery3.jpg";
import profil4 from "../img/delivery4.jpg";
import {Container, Row, Col} from "reactstrap";
import "../Style/Font.css";

class AboutUs extends Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        return (
            <Fragment>
                <Header bgNav={"#1EABFF"}/>
                <JumbotronKu image={bg}
                             jumboAfter={'linear-gradient(to right, rgba(19,54,113,1), rgba(19,54,113,0) 70%)'}
                             title={'About Us'}/>
                <main>
                    <Container>
                        <Row className="row">
                            <div className="col-md-6">
                                <div className="image-row">
                                    <div className="image-center">
                                        <div className="aboutus"
                                             style={{
                                                 background: `url(${profil1})`,
                                                 backgroundPosition: "center",
                                                 backgroundSize: "contain"
                                             }}>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-center" style={{paddingTop:"20px", fontWeight:"Bold", fontFamily:"Kaushan Script", fontSize:"25px"}}>Tentang Kami</h3>
                                <p style={{textAlign:"justify"}}>
                                    YFA Express hadir sebagai solusi kebutuhan pengiriman barang, berupaya memberikan
                                    layanan ekspedisi dan pengiriman terbaik bagi seluruh customer untuk kebutuhan
                                    logistik perusahaan maupun retail. Pelayanan prima YFA Express didukung oleh
                                    personil yang terampil, berfokus kepada pengiriman barang-barang dikombinasikan
                                    dengan pengalaman selama bertahun – tahun.
                                </p>
                            </div>
                            <div className="col-md-6 jarak">
                                <div className="row">
                                    <div className="image-center">
                                        <div className="aboutus"
                                             style={{
                                                 background: `url(${profil4})`,
                                                 backgroundPosition: "center",
                                                 backgroundSize: "contain"
                                             }}>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-center" style={{paddingTop:"20px", fontWeight:"Bold", fontFamily:"Kaushan Script", fontSize:"25px"}}>Visi & Misi</h3>
                                <p style={{fontWeight:"Bold", fontFamily:"Caveat", fontSize:"23px"}}>Visi</p>
                                <p style={{textAlign:"justify"}}>
                                    Selalu menjadi partner jasa pengiriman anda yang jujur dan dipercaya untuk saat ini
                                    dan di masa yang akan datang.
                                </p>
                                <p style={{fontWeight:"Bold", fontFamily:"Caveat", fontSize:"23px", paddingBottom:"10px"}}>Misi</p>
                                <p style={{textAlign:"justify"}}>
                                    Memberikan layanan yang melampaui kepuasan pelanggan dan layanan bernilai tambah
                                    kepada pelanggan dengan membangun jaringan yang kuat, didukung oleh SDM yang
                                    berintegritas , serta teknologi yang mengikuti perkembangan jaman.
                                </p>
                            </div>
                            <div className="col-md-6">
                                <div className="image-row">
                                    <div className="image-center">
                                        <div className="aboutus"
                                             style={{
                                                 background: `url(${profil3})`,
                                                 backgroundPosition: "center",
                                                 backgroundSize: "contain"
                                             }}>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-center" style={{paddingTop:"20px", fontWeight:"Bold", fontFamily:"Kaushan Script", fontSize:"25px"}}>Mengapa Memilih Kami ?</h3>
                                <p style={{textAlign:"justify"}}>
                                    Kami fokus dalam Industri Logisctic & Ditribution Domestik. Kini telah mengembangkan
                                    jaringan domestik beberapa cabang di seluruh Indonesia. Kami didukung oleh lebih
                                    dari 20 staff yang berpengalaman di bidangnya dengan armada mobil wing box, fuso,
                                    cdd, engkel, grandmax, dll. Menangani kiriman project distribusi dan paket keseluruh
                                    Indonesia.
                                </p>

                            </div>
                            <div className="col-md-6 jarak">
                                <div className="row">
                                    <div className="image-center">
                                        <div className="aboutus"
                                             style={{
                                                 background: `url(${profil2})`,
                                                 backgroundPosition: "center",
                                                 backgroundSize: "contain"
                                             }}>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-center" style={{paddingTop:"20px", fontWeight:"Bold", fontFamily:"Kaushan Script", fontSize:"25px"}}>Nilai Perusahaan</h3>
                                <p style={{textAlign:"justify"}}>
                                    Sebagai perusahaan yang memiliki kredibilitas tinggi di mata pelanggan dengan tetap
                                    menyongsong tarif yang murah, kami selalu bertanggung jawab atas setiap layanan
                                    yang diberikan kepada pelanggan. Kerjasama antar team dalam perusahaan yang selalu
                                    bersinergi, diiringi dengan teknologi informasi menjadikan YFA Express ahlinya jasa
                                    ekspedisi dan jasa pengiriman barang Indonesia.
                                </p>
                            </div>
                        </Row>
                    </Container>
                </main>
                <Footer/>

            </Fragment>
        );
    }
}

export default AboutUs;