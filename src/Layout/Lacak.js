import React, {Component, Fragment} from 'react';
import {Container} from "bootstrap-4-react/lib/components/layout";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faFilePdf, faFileExcel} from "@fortawesome/free-solid-svg-icons";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import JumbotronKu from "../Components/JumbotronKu";
import Loading from "../Components/Loading";
import bg from "../img/2.jpg";
import bgLacak from "../img/lacak.jpg"
import '../Style/Lacak.css';
import styled from "styled-components";
import Tooltip from "@material-ui/core/Tooltip";
import axios, { AxiosResponse, AxiosError } from "axios";
import AlertKu from "../Components/AlertKu";

const types = ['lacak', 'tarif']
const Button = styled.div`
    width: 100px;
    height: 25px;
    font-size: 11px;
    text-align: center;
    line-height: 25px;
    color: #333;
    cursor: pointer;
    @media (min-width: 450px) {
        width: 150px;
        height: 37px;
        line-height: 37px;
        font-size: 14px;
    }
`
const ButtonToggle = styled(Button)`
    background-color: #ececec;
    color: #333;
    ${({active}) =>
    active && `
    background-color: rgba(30, 171, 255, 1);
    color: #fff;
  `}
`;

const ButtonGroup = styled.div`
  display: flex;
`;

var displayLacak = {display: 'block'}
var displayTarif = {display: 'none'}

 // const getDataResi = (resi) => {
//     fetch(`http://localhost:3333/api/transaksi/resi/${resi}`, {
//         mode: 'no-cors',
//         method: 'get',
//         headers: {
//             "Content-Type": "application/json"
//         },
//     })
//         .then(res => {
//             if(res.ok) {
//                 return res.json()
//                 console.log(res.json())
//             }
//             throw res;
//         })
//         .then(data => {
//             this.setState({data})
//         })
//         .catch(error => {
//             console.error("error fetching data : ", error);
//         })
//         .finally()
// }

class Lacak extends Component {
    constructor() {
        super();
        this.handleClickNavigasi = this.handleClickNavigasi.bind(this)
        this.handleChangeInput = this.handleChangeInput.bind(this)
        this.handleDeleteResi = this.handleDeleteResi.bind(this)
        this.getDataResi = this.getDataResi.bind(this)
        this.getReport = this.getReport.bind(this)
        this.state = {
            active : types[0],
            loading : false,
            display: 'block',
            displayTable: 'block',
            displayLoading : 'none',
            data: []
        }
    }

    handleClickNavigasi(type) {
        this.setState({
            active: type
        })
        if (type === types[0]) {
            displayLacak = {display: 'block'}
            displayTarif = {display: 'none'}
        } else {
            displayLacak = {display: 'none'}
            displayTarif = {display: 'block'}
        }
    }

    handleChangeInput(event) {
        this.setState({[event.target.name] : event.target.value})
    }

    handleDeleteResi() {
        this.setState({
            resi : '',
            display: 'block',
            displayTable: 'none'
        })
    }

    getDataResi = async (resi) => {
        this.setState({
            displayLoading: 'block'
        })

        await axios.get(`http://localhost:3333/api/transaksi/resi/${resi}`)
            .then(res => {
                console.log(res)
                this.setState({
                    data: res.data,
                    loading: true,
                    display: 'none',
                    displayTable: 'block',
                })
                // console.log(this.state.data)
            })
            .catch(error => {
                return (
                    <div>
                        <AlertKu />
                    </div>
                )
            }
        )
    }

    async getReport(extensi) {
        axios({
            url : `http://localhost:3333/report/${this.state.data.resi}.${extensi}`,
            method : 'GET',
            responseType : 'blob'
        }).then((res) => {
            const url = window.URL.createObjectURL(new Blob([res.data]))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute('download', `${this.state.data.resi}.${extensi}`)
            document.body.appendChild(link)
            link.click()
        })
    }

    render () {
        return (
            <Fragment>
                <Header bgNav={"#1EABFF"}/>
                <JumbotronKu image={bg}
                             jumboAfter={'linear-gradient(to right, rgba(19,54,113,1), rgba(19,54,113,0) 70%)'}
                             title={'Lacak'}/>
                <main>
                    <Container>
                        {/* navigasi */}
                        <div class="search-by">
                            <ButtonGroup>
                                {types.map(type => (
                                    <ButtonToggle
                                        key={type}
                                        active={this.state.active  === type}
                                        onClick={() => this.handleClickNavigasi(type)}>
                                        {type}
                                    </ButtonToggle>
                                ))}
                            </ButtonGroup>
                        </div>

                        {/* content */}
                        <div className="container container-form">
                            {/* lacak paket */}
                            <div className="form-lacak-paket" style={displayLacak}>
                                {/* lacak resi */}
                                <div className="form-lacak-paket">
                                    {/* search */}
                                    <div className="row">
                                        <div className="col-md-12 search">
                                            <input type="text" name="resi" id="resi" placeholder="masukkan nomor resi" value={this.state.resi} onChange={this.handleChangeInput}/>
                                            <div className="icon-hapus" onClick={this.handleDeleteResi}>
                                                <FontAwesomeIcon icon={faTrash}/>
                                            </div>
                                        </div>
                                        <div className="col-md-12 tombol-search">
                                            <button className="btn btn-primary cari-resi" onClick={() => this.getDataResi(this.state.resi)}>Cari</button>
                                        </div>
                                    </div>
                                </div>

                                {/* image lacak */}
                                <div className="row gambar-lacak" style={{display : this.state.display}}>
                                    <div className="col-md-12 col-gambar-lacak">
                                        <img src={bgLacak} alt="lacak"/>
                                    </div>
                                </div>

                                {/* tabel resi */}
                                {this.state.loading? <div className="table-resi" style={{display : this.state.displayTable}}>
                                    <div className="table-responsive">
                                        <table className="table table-1">
                                            <thead>
                                            <tr>
                                                <th scope="col">Resi</th>
                                                <th scope="col">Tanggal Order</th>
                                                <th scope="col">Layanan</th>
                                                <th scope="col">Asal</th>
                                                <th scope="col">Tujuan</th>
                                                <th scope="col">Status</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td className="resi">{this.state.resi}</td>
                                                <td className="tgl">{this.state.data.tanggalTransaksi}</td>
                                                <td className="layanan">{this.state.data.kategoriLayanan}</td>
                                                <td className="asal">{this.state.data.cityName + ", " + this.state.data.provinceName}</td>
                                                <td className="tujuan">{this.state.data.cityNamePenerima + ", " + this.state.data.provinceNamePenerima}</td>
                                                <td className="status">{this.state.data.statusDelivery}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table table-2">
                                            <thead>
                                            <tr>
                                                <th scope="col">Kurir</th>
                                                <th scope="col">Penerima</th>
                                                <th scope="col">Tanggal Sampai</th>
                                                <th scope="col">Cetak</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td className="kurir">{this.state.data.namaKurir}</td>
                                                <td className="penerima">{this.state.data.namaPenerima}</td>
                                                <td className="tglSampai">{this.state.data.tanggalSampai}</td>
                                                <td className="col-print">
                                                    <div className="wadah-cetak">
                                                        <Tooltip title="pdf">
                                                            <div className="pdf" onClick={()=>this.getReport('pdf')}>
                                                                <i className="fas fa-file-pdf print">
                                                                    <FontAwesomeIcon icon={faFilePdf}/>
                                                                </i>
                                                            </div>
                                                        </Tooltip>
                                                        <Tooltip title="excel">
                                                            <div className="excel" onClick={()=>this.getReport("xlsx")}>
                                                                <i className="fas fa-file-excel print">
                                                                    <FontAwesomeIcon icon={faFileExcel}/>
                                                                </i>
                                                            </div>
                                                        </Tooltip>
                                                    </div>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div> : <Loading display={this.state.displayLoading}/>}
                            </div>

                            {/* cek tarif */}
                            <div className="form-cek-tarif" style={displayTarif}>
                                <div className="container container-col-form">
                                    <div className="col-form">
                                        <div className="row input-data-lacak">
                                            <div className="col-md-4 text-naik asal-paket">
                                                <div style={{position: "relative"}}>
                                                    <input className="asal" title="asal" id="asal" type="text"/>
                                                    <span data-placeholder="Dari"></span>
                                                    {/*<div id="kotaList"></div>*/}
                                                    {/*<input type="hidden" id="asalHidden" />*/}
                                                </div>
                                            </div>
                                            <div className="col-md-4 text-naik tujuan-paket">
                                                <div style={{position: "relative"}}>
                                                    <input id="tujuan" type="text" />
                                                    <span data-placeholder="Ke"></span>
                                                    {/*<div id="kotaList2"></div>*/}
                                                    {/*<input type="hidden" id="tujuanHidden"/>*/}
                                                </div>
                                            </div>
                                            <div className="col-md-4 text-naik berat-paket">
                                                <div style={{position: "relative"}} className="div-berat">
                                                    <input id="berat" type="text"/>
                                                    <span data-placeholder="Berat (kg)"></span>
                                                    <i className="fa fa-plus-circle" title="cetak pdf"></i>
                                                    <i className="fa fa-minus-circle" title="cetak excel"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="btn-cek-tarif">
                                            <button className="btn btn-primary cari-layanan">Cari</button>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>

                    {/* modal loading*/}
                    <Loading />
                </main>
                <Footer />

            </Fragment>
        );
    }


}

export default Lacak;