import React, {Component, Fragment} from 'react';
import axios from "axios";

import {
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

import Select from 'react-select'
import Header from "../Components/Header";
import Jumbo from "../Components/Jumbo";
import Footer from "../Components/Footer";
import bg from "../img/1.jpg"

function NamaLabel(props) {
    return <label>{props.name}</label>;
}

var cityId
var cityIdPenerima
var berat

class DropOff extends Component {
    constructor() {
        super();
        this.state = {
            selectOptions: [],
            selectOptionsKota: [],
            selectOptionsKotaPenerima: [],
            selectOptionLayanan:[],
            province_id: "",
            provinceName: "",
            provinceIdPenerima: "",
            provinceNamePenerima: "",
            city_id: "",
            city_name: "",
            city_idpenerima: "",
            city_namepenerima: "",
            beratBarang:""

        }
    }


    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleChangeBerat = (e) => {
        this.setState({[e.target.name]: e.target.value})
        berat = e.target.value
    }


    async getOptions() {
        const res = await axios.get('http://localhost:3333/api/provinsi', {
            headers: {'Content-Type': 'application/json'}
        })
        const data = res.data
        const options = data.map(d => ({
            "value": d.province_id,
            "label": d.province
        }))
        this.setState({selectOptions: options})
    }


    async handleChangeSelectProvince(e) {
        this.setState({
            province_id: e.value,
            provinceName: e.label
        })
        const province_id = e.value
        const res = await axios.get("http://localhost:3333/api/kotaRaja/" + province_id, {
            headers: {'Content-Type': 'application/json'}
        })

        const data = res.data
        const options = data.map(d => ({
            "value": d.city_id,
            "label": d.type + " " + d.city_name
        }))
        this.setState({selectOptionsKota: options})
    }


    async handleChangeSelectProvincePenerima(e) {
        this.setState({
            provinceIdPenerima: e.value,
            provinceNamePenerima: e.label
        })
        const provinceIdPenerima = e.value
        const res = await axios.get("http://localhost:3333/api/kotaRaja/" + provinceIdPenerima, {
            headers: {'Content-Type': 'application/json'}
        })
        const data = res.data
        const options = data.map(d => ({
            "value": d.city_id,
            "label": d.type + " " + d.city_name
        }))
        this.setState({selectOptionsKotaPenerima: options})
        console.log(this.state)
    }

    async handleRequestCost(e) {

        console.log("kata kata")
        console.log(cityId, cityIdPenerima, berat)


        const res = await axios.get("http://localhost:3333/api/cost/" + cityId + "/" + cityIdPenerima + "/" + berat, {
            headers: {'Content-Type': 'application/json'}
        })
        const data = res.data
        console.log(data)
        const options = data.map(d => ({
            "value": d.cost[0].value,
            "label": d.service,
            "title": d.cost[0].etd
        }))
        // this.setState({selectOptionLayanan: options})
        console.log(options)
    }


    handleChangeSelectKota(e) {
        this.setState({
            city_id: e.value,
            city_name: e.label
        })
        cityId = e.value
    }


    handleChangeSelectKotaPenerima(e) {
        this.setState({
            city_idpenerima: e.value,
            city_namepenerima: e.label
        })
        cityIdPenerima = e.value
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
            "kategoriBeratBarang": this.state.kategoriBeratBarang,

            "layanan": this.state.layanan
        });
        const blobDoc = new Blob([json], {
            type: "application/json"
        });

        const config = {
            headers: {
                "content-type": "multipart/mixed",
            }
        }
        axios.post("http://localhost:3333/api/kotaRaja", formData, config)
            .then(res => console.log(res.data))
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
                                                <Input type="text" name="namaPengirim" id="namaPengirim"
                                                       onChange={this.handleChange} required/>
                                            </FormGroup>
                                            <FormGroup>
                                                <NamaLabel name="No Telp :"/>
                                                <Input type="tel" name="telpPengirim" id="telpPengirim"
                                                       onChange={this.handleChange} required/>
                                            </FormGroup>
                                            <FormGroup>
                                                <NamaLabel name="Provinsi :"/>
                                                <Select type="select" name="province_id" id="province"
                                                        placeholder="Pilih Provinsi"
                                                        options={this.state.selectOptions}
                                                        onChange={this.handleChangeSelectProvince.bind(this)} required/>
                                                <Input type="hidden" id="provinceName" name="provinceName"
                                                       value={this.state.provinceName}/>
                                            </FormGroup>
                                            <FormGroup>
                                                <NamaLabel name="Kota Asal :"/>
                                                <Select name="city_id" id="city_name"
                                                        placeholder="Pilih Kota"
                                                        options={this.state.selectOptionsKota}
                                                        onChange={this.handleChangeSelectKota.bind(this)} required/>
                                                <Input type="hidden" id="cityName" name="cityName"
                                                       value={this.state.city_name}/>
                                                <Input type="hidden" id="cityPengirimId" name="cityPengirimId"
                                                       value={this.state.city_id}/>
                                            </FormGroup>
                                            <FormGroup>
                                                <NamaLabel name="Alamat :"/>
                                                <Input type="text" name="alamatPengirim" id="alamatPengirim"
                                                       onChange={this.handleChange} required/>
                                            </FormGroup>
                                            <FormGroup>
                                                <NamaLabel name="Kode Pos :"/>
                                                <Input type="text" name="kodePosPengirim" id="kodePosPengirim"
                                                       onChange={this.handleChange} required/>
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
                                                <Input type="text" name="namePenerima" id="namaPenerima"
                                                       onChange={this.handleChange} required/>
                                            </FormGroup>
                                            <FormGroup>
                                                <NamaLabel name="No Telp :"/>
                                                <Input type="tel" name="telpPenerima" id="telpPenerima"
                                                       onChange={this.handleChange} required/>
                                            </FormGroup>
                                            <FormGroup>
                                                <NamaLabel name="Provinsi :"/>
                                                <Select name="province_id" id="provincepenerima"
                                                        placeholder="Pilih Provinsi"
                                                        options={this.state.selectOptions}
                                                        onChange={this.handleChangeSelectProvincePenerima.bind(this)}
                                                        required/>
                                                <Input type="hidden" id="provinceNamePenerima" name="provinceNamePenerima"
                                                       value={this.state.provinceNamePenerima}/>
                                            </FormGroup>
                                            <FormGroup>
                                                <NamaLabel name="Kota Tujuan :"/>
                                                <Select name="city_id" id="city_name"
                                                        placeholder="Pilih Kota"
                                                        options={this.state.selectOptionsKotaPenerima}
                                                        onChange={this.handleChangeSelectKotaPenerima.bind(this)}
                                                        required/>
                                                <Input type="hidden" id="cityNamePenerima" name="cityNamePenerima"
                                                       value={this.state.city_namepenerima}/>
                                                <Input type="hidden" id="cityPenerimaId" name="cityPenerimaId"
                                                       value={this.state.city_idpenerima}/>
                                            </FormGroup>
                                            <FormGroup>
                                                <NamaLabel name="Alamat :"/>
                                                <Input type="text" name="alamatPenerima" id="alamatPenerima"
                                                       onChange={this.handleChange} required/>
                                            </FormGroup>
                                            <FormGroup>
                                                <NamaLabel name="Kode Pos :"/>
                                                <Input type="text" name="kodePosPenerima" id="kodePosPenerima"
                                                       onChange={this.handleChange} required/>
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
                                                <Input type="text" name="namaBarang" id="namaBarang"
                                                       onChange={this.handleChange} required/>
                                            </FormGroup>
                                            <FormGroup>
                                                <NamaLabel name="Jumlah Barang :"/>
                                                <Input type="text" name="jumlahBarang" id="jumlahBarang"
                                                       onChange={this.handleChange} required/>
                                            </FormGroup>
                                            <FormGroup>
                                                <NamaLabel name="Total Berat Barang (gram) :"/>
                                                <Input type="number" name="beratBarang" id="kategoriBeratBarang"
                                                       onChange={this.handleChangeBerat} required/>
                                            </FormGroup>
                                            <Button className="mb-2 mr-2 btn-icon" color="primary" id="btn-cekharga"
                                                    type="button" onClick={this.handleRequestCost}>
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
                                                <Select type="select" name="layanan_id" id="layanan"
                                                        placeholder="Pilih Layanan"
                                                        options={this.state.selectOptionLayanan}
                                                        onChange={this.handleChangeSelectProvince.bind(this)} required/>
                                                <Input type="text" id="kategoriLayanan" name="kategoriLayanan"/>
                                            </FormGroup>
                                            <FormGroup className="ongkirajadeh">
                                                <NamaLabel name="Total Biaya Kirim :"/>
                                                <p>Rp. <span id="ongkosKirimSpan">0</span></p>
                                                <NamaLabel name="Estimasi : "/>
                                                <p><span id="waktuKirim">-</span> Hari</p>
                                                <Input type="hidden" id="ongkosKirim" name="ongkosKirim"/>
                                                <Input type="hidden" id="estimasi" name="estimasi"/>
                                                <Input type="hidden" id="statusDelivery" name="statusDelivery"
                                                       value="Undelivered"/>
                                                <Input type="hidden" id="penerimaPaket" name="penerimaPaket"
                                                       value="penerima"/>
                                                <Input type="hidden" id="fotoPenerima" name="fotoPenerima"
                                                       value="penerima.jpg"/>
                                            </FormGroup>
                                            <Button className="mb-2 mr-2 btn-icon" color="info" id="btn-save-utama"
                                                    type="button" onClick={this.onSubmit}>
                                                <i className="pe-7s-science btn-icon-wrapper"> </i>
                                                Order
                                            </Button>
                                            <Button className="mb-2 mr-2 btn-icon" color="danger" id="btn-reset"
                                                    type="button" onClick={this.onSubmit}>
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
                <Footer/>

            </Fragment>
        );
    }
}

export default DropOff;