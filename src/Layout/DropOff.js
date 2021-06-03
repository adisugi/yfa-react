import React, {Component, Fragment} from 'react';
import axios from "axios";

import{
    Button,
    Card,
    CardBody,
    CardTitle,
    Col,
    Container, CustomInput,
    Form,
    FormGroup,
    FormText,
    Input,
    Label,
    Row
} from "reactstrap";
import Header from "../Components/Header";
import Jumbo from "../Components/Jumbo";
import Footer from "../Components/Footer";
import bg from "../img/1.jpg"

function NamaLabel(props){
    return <label>{props.name}</label>;
}

class DropOff extends Component {
    constructor() {
        super();
        this.state = {}
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    async getOptions(){
        const res = await axios.get('http://localhost:1515/api/provinsi', {
            headers: { 'Content-Type': 'application/json'}
        })

        const data = res.data

        const options = data.map(d => ({
            "value" : d.province_id,
            "label" : d.province

        }))

        this.setState({selectOptions: options})

    }

    handleChangeSelectProvince(e){
        this.setState({province_id:e.value})
    }

    componentDidMount() {
        this.getOptions()
    }

    onSubmit = (e) => {

        const formData = new FormData();
        // console.log("step 1");
        const json = JSON.stringify({
            "namaPengirim": this.state.namaPengirim,
            "telpPengirim": this.state.telpPengirim,
            "province": this.state.province,
            "city_name": this.state.city_name,
            "alamatPengirim": this.state.alamatPengirim,
            "kodePosPengirim": this.state.kodePosPengirim,

            "namaPenerima": this.state.namaPenerima,
            "telpPenerima": this.state.telpPenerima,
            "provincepenerima": this.state.provincepenerima,
            "city_namepenerima": this.state.city_namepenerima,
            "alamatPenerima": this.state.alamatPenerima,
            "kodePosPenerima": this.state.kodePosPenerima,

            "namaBarang": this.state.namaBarang,
            "jumlahBarang": this.state.jumlahBarang,
            "kategoriBeratBarang":this.state.kategoriBeratBarang,

            "layanan":this.state.layanan
        });

        const blobDoc = new Blob([json], {
            type: "application/json"
        });

        const config = {
            headers: {
                "content-type": "multipart/mixed",

            }
        }

        axios.post("http://localhost:1515/api/kotaRaja", formData, config)
            .then(res => console.log(res.data))


        // const cors = require('cors');
        // const corsOptions ={
        //     origin:'http://localhost:3000',
        //     credentials:true,            //access-control-allow-credentials:true
        //     optionSuccessStatus:200
        // }
        // app.use(cors(corsOptions));
    }

    render() {
        return (
            <Fragment>
                <Header bgNav={"#133671"}/>
                <Jumbo image={bg}
                       jumboAfter={'linear-gradient(to right, rgba(30,171,255,1), rgba(30,171,255,0) 70%)'}
                       title={'Drop Off'}/>
                <main>
                    <Container fluid>
                        <Row>
                            <Col md="6">
                                <Card className="main-card mb-3">
                                    <CardBody>
                                        <CardTitle><h5>Informasi Pengirim</h5></CardTitle>
                                        <Form>
                                            <Input id="idPengirim" name="idPengirim" type="hidden"/>
                                            <FormGroup>
                                                <NamaLabel name="Nama Pengirim :"/>
                                                <Input type="text" name="namaPengirim" id="namaPengirim" onChange={this.handleChange} required/>
                                            </FormGroup>
                                            <FormGroup>
                                                <NamaLabel name="No Telp :"/>
                                                <Input type="tel" name="telpPengirim" id="telpPengirim" onChange={this.handleChange} required/>
                                            </FormGroup>
                                            <FormGroup>
                                                <NamaLabel name="Provinsi :"/>
                                                <CustomInput type="select" name="province_id" id="province" onChange={this.handleChangeSelectProvince.bind(this)} required>
                                                    <option value="-1">Provinsi</option>
                                                </CustomInput>
                                                <Input type="hidden" id="provinceName" name="provinceName"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <NamaLabel name="Kota Asal :"/>
                                                <CustomInput type="select" name="city_id" id="city_name" onChange={this.handleChange} required>
                                                    <option value="-1">Kota Asal</option>
                                                </CustomInput>
                                                <Input type="hidden" id="cityName" name="cityName"/>
                                                <Input type="hidden" id="cityPengirimId" name="cityPengirimId"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <NamaLabel name="Alamat :"/>
                                                <Input type="text" name="alamatPengirim" id="alamatPengirim" onChange={this.handleChange} required/>
                                            </FormGroup>
                                            <FormGroup>
                                                <NamaLabel name="Kode Pos :"/>
                                                <Input type="text" name="kodePosPengirim" id="kodePosPengirim" onChange={this.handleChange} required/>
                                            </FormGroup>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md="6">
                                <Card className="main-card mb-3">
                                    <CardBody>
                                        <CardTitle><h5>Informasi Penerima</h5></CardTitle>
                                        <Form>
                                            <Input id="idPenerima" name="idPenerima" type="hidden"/>
                                            <FormGroup>
                                                <NamaLabel name="Nama Penerima :"/>
                                                <Input type="text" name="namePenerima" id="namaPenerima" onChange={this.handleChange} required/>
                                            </FormGroup>
                                            <FormGroup>
                                                <NamaLabel name="No Telp :"/>
                                                <Input type="tel" name="telpPenerima" id="telpPenerima" onChange={this.handleChange} required/>
                                            </FormGroup>
                                            <FormGroup>
                                                <NamaLabel name="Provinsi :"/>
                                                <CustomInput type="select" name="province_id" id="provincepenerima"  onChange={this.handleChange} required>
                                                    <option value="-1">Provinsi</option>
                                                </CustomInput>
                                                <Input type="hidden" id="provinceNamePenerima" name="provinceNamePenerima"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <NamaLabel name="Kota Tujuan :"/>
                                                <CustomInput type="select" name="city_id" id="city_namepenerima" onChange="kotaPenerimaHidden()" onChange={this.handleChange} required>
                                                    <option value="-1">Kota Tujuan</option>
                                                </CustomInput>
                                                <Input type="hidden" id="cityNamePenerima" name="cityNamePenerima"/>
                                                <Input type="hidden" id="cityPenerimaId" name="cityPenerimaId"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <NamaLabel name="Alamat :"/>
                                                <Input type="text" name="alamatPenerima" id="alamatPenerima" onChange={this.handleChange} required/>
                                            </FormGroup>
                                            <FormGroup>
                                                <NamaLabel name="Kode Pos :"/>
                                                <Input type="text" name="kodePosPenerima" id="kodePosPenerima" onChange={this.handleChange} required/>
                                            </FormGroup>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md="12">
                                <Card className="main-card mb-3">
                                    <CardBody>
                                        <CardTitle><h5>Informasi Barang</h5></CardTitle>
                                        <Form>
                                            <Input id="idBarang" name="idBarang" type="hidden"/>
                                            <FormGroup>
                                                <NamaLabel name="Nama Barang :"/>
                                                <Input type="text" name="namaBarang" id="namaBarang" onChange={this.handleChange} required/>
                                            </FormGroup>
                                            <FormGroup>
                                                <NamaLabel name="Jumlah Barang :"/>
                                                <Input type="text" name="jumlahBarang" id="jumlahBarang" onChange={this.handleChange} required/>
                                            </FormGroup>
                                            <FormGroup>
                                                <NamaLabel name="Total Berat Barang (gram) :"/>
                                                <Input type="number" name="beratBarang" id="kategoriBeratBarang" onChange={this.handleChange} required/>
                                            </FormGroup>
                                            <Button className="mb-2 mr-2 btn-icon" color="primary" id="btn-cekharga" type="button" onClick={this.onSubmit}>
                                                <i className="pe-7s-tools btn-icon-wrapper"> </i>
                                                Cek Harga
                                            </Button>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md="12">
                                <Card className="main-card mb-3">
                                    <CardBody>
                                        <CardTitle><h5>Total Harga</h5></CardTitle>
                                        <Form>
                                            <Input id="idtotalBiaya" name="idtotalBiaya" type="hidden"/>
                                            <FormGroup>
                                                <NamaLabel name="Pilih Layanan :"/>
                                                <CustomInput type="select" name="layanan_id" id="layanan" onChange="layananOngkirHidden()" required>
                                                    <option value="-1">Services</option>
                                                </CustomInput>
                                                <Input type="hidden" id="kategoriLayanan" name="kategoriLayanan"/>
                                            </FormGroup>
                                            <FormGroup className="ongkirajadeh">
                                                <NamaLabel name="Total Biaya Kirim :"/>
                                                <p>Rp. <span id="ongkosKirimSpan">0</span></p>
                                                <NamaLabel name="Estimasi : "/>
                                                <p><span id="waktuKirim">-</span> Hari</p>
                                                <Input type="hidden" id="ongkosKirim" name="ongkosKirim"/>
                                                <Input type="hidden" id="estimasi" name="estimasi"/>
                                                <Input type="hidden" id="statusDelivery" name="statusDelivery" value="Undelivered"/>
                                                <Input type="hidden" id="penerimaPaket" name="penerimaPaket" value="penerima"/>
                                                <Input type="hidden" id="fotoPenerima" name="fotoPenerima" value="penerima.jpg"/>
                                            </FormGroup>
                                            <Button className="mb-2 mr-2 btn-icon" color="info" id="btn-save-utama" type="button" onClick={this.onSubmit}>
                                                <i className="pe-7s-science btn-icon-wrapper"> </i>
                                                Order
                                            </Button>
                                            <Button className="mb-2 mr-2 btn-icon" color="danger" id="btn-reset" type="button" onClick={this.onSubmit}>
                                                <i className="pe-7s-science btn-icon-wrapper"> </i>
                                                Close
                                            </Button>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>

                </main>
                <Footer />

            </Fragment>
        );
    }
}

export default DropOff;