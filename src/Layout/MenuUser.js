import React, {Component, Fragment} from 'react';
import Header from "../Components/Header";
import JumbotronKu from "../Components/JumbotronKu";
import Footer from "../Components/Footer";
import {Table} from "../Components/Table"
import ModalKu from "../Components/ModalKu"
import bg from "../img/2.jpg"
import '../Style/MenuAdmin.scss'
import axios from "axios";
import Loading from "../Components/Loading";
// import IconButton from "@material-ui/core/IconButton";
// import HighlightOffIcon from '@material-ui/icons/HighlightOff';
// import {PhotoCamera} from "@material-ui/icons";
// import decode from "jwt-decode";

class MenuAdmin extends Component {
    constructor() {
        super();
        let dataForm = {
            namaPengirim: "",
            telpPengirim: "",
            provinceName: "",
            cityName: "",
            alamatPengirim: "",
            kodePosPengirim: "",
            namaPenerima: "",
            telpPenerima: "",
            provinceNamePenerima: "",
            cityNamePenerima: "",
            alamatPenerima: "",
            kodePosPenerima: "",
            namaBarang: "",
            jumlahBarang: "",
            beratBarang: "",
            kategoriLayanan: "",
            ongkosKirim: "",
            estimasi: "",
            email: "",
            statusDelivery: '',
            penerimaPaket: '',
            fotoPenerima: '',
            idKurir: ''
        }
        this.state = {
            dataTable:[],
            column:[],

            //ganti tabel
            tabelTransaksi : true,
            tabelKurir : false
        }
    }

    //request data transaksi dan gambar
    async getDataTransaksi() {
        const email = localStorage.getItem("email")
        const res = await axios.get(`http://localhost:3333/api/transaksi/history/${email}`, {
            headers: {'Content-Type': 'application/json'}
        })
        let img = [];
        for (let i=0; i<res.data.length; i++) {
            const dataImage = await axios.get("http://localhost:3333/api/transaksi/getImage/" + res.data[i].idTransaksi, {
                headers: {'Content-Type' : 'application/json'}
            })
            img.push(dataImage.data)
        }
        const data = res.data
        const dataTable = data.map((content, index) => ({
            idTransaksi: content.idTransaksi,
            idPenerima: content.idPenerima,
            idPengirim: content.idPengirim,
            isDelete: content.isDelete,
            idKurir: content.idKurir,
            fotoPenerima: content.fotoPenerima,
            image: <img src={"data:image/*;base64," + img[index]} alt="foto penerima" style={{width:"100px", borderRadius:"5px"}} />,
            tanggalTransaksi: content.tanggalTransaksi,
            resi: content.resi,
            email: content.email,
            firstName: content.username,
            namaBarang: content.namaBarang,
            jumlahBarang: content.jumlahBarang,
            beratBarang: content.beratBarang,
            namaPengirim: content.namaPengirim,
            provinceName: content.provinceName,
            cityName: content.cityName,
            alamatPengirim: content.alamatPengirim,
            telpPengirim: content.telpPengirim,
            kodePosPengirim: content.kodePosPengirim,
            namaPenerima: content.namaPenerima,
            provinceNamePenerima: content.provinceNamePenerima,
            cityNamePenerima: content.cityNamePenerima,
            alamatPenerima: content.alamatPenerima,
            telpPenerima: content.telpPenerima,
            kodePosPenerima: content.kodePosPenerima,
            kategoriLayanan: content.kategoriLayanan,
            ongkosKirim: content.ongkosKirim,
            estimasi: content.estimasi,
            statusDelivery: content.statusDelivery,
            namaKurir: content.namaKurir,
            penerimaPaket: content.penerimaPaket
        }))
        return dataTable
    }

    //mounting
    componentDidMount() {
        //set state data transaksi
        this.getDataTransaksi().then(res => {
            this.setState({dataTable: res})
            this.setState({
                column: [
                    // {title: 'id', field: 'id'},
                    {title: 'Tanggal Transaksi', field: 'tanggalTransaksi'},
                    {title: 'No. Resi', field: 'resi'},
                    {title: 'User Name', field: 'firstName'},
                    {title: 'Nama Barang', field: 'namaBarang'},
                    {title: 'Jumlah Barang', field: 'jumlahBarang'},
                    {title: 'Berat Barang (gram)', field: 'beratBarang'},
                    {title: 'Pengirim', field: 'namaPengirim'},
                    {title: 'Provinsi Pengirim', field: 'provinceName'},
                    {title: 'Kota Pengirim', field: 'cityName'},
                    {title: 'Alamat Pengirim', field: 'alamatPengirim'},
                    {title: 'Telp. Pengirim', field: 'telpPengirim'},
                    {title: 'Kode Pos Pengirim', field: 'kodePosPengirim'},
                    {title: 'Penerima', field: 'namaPenerima'},
                    {title: 'Provinsi Penerima', field: 'provinceNamePenerima'},
                    {title: 'Kota Penerima', field: 'cityNamePenerima'},
                    {title: 'Alamat Penerima', field: 'alamatPenerima'},
                    {title: 'Telp. Penerima', field: 'telpPenerima'},
                    {title: 'Kode Pos Penerima', field: 'kodePosPenerima'},
                    {title: 'Layanan', field: 'kategoriLayanan'},
                    {title: 'Ongkir (Rp)', field: 'ongkosKirim'},
                    {title: 'Estimasi (Hari)', field: 'estimasi'},
                    {title: 'Nama Kurir', field: 'namaKurir'},
                    {title: 'Penerima Paket', field: 'penerimaPaket'},
                    {title: 'Status', field: 'statusDelivery'},
                    {title: 'Foto Penerima', field: 'image'}
                ]
            })
        })
    }

        //token decode
        // this.decodeToken();

    //pindah table
    tabelTransaksiUser () {
        this.setState({
            tabelTransaksi : true,
            tabelUser : false
        })
        const link = document.createElement("a")
        link.href = "/#/user/transaksi"
        document.body.appendChild(link)
        link.click()
    }
    tabelUser () {
        this.setState({
            tabelTransaksi : false,
            tabelUser : true
        })
        const link = document.createElement("a")
        link.href = "/#/profiluser"
        document.body.appendChild(link)
        link.click()
    }


    render() {
        return (
            <Fragment>
                <Header bgNav={"#1EABFF"}/>
                <JumbotronKu image={bg}
                             jumboAfter={'linear-gradient(to right, rgba(19,54,113,1), rgba(19,54,113,0) 70%)'}
                             title={"Menu Admin"}/>
                <main>
                    <div style={{marginBottom: '70px'}}>

                        <div className="pilih">
                            <div className="pilih-tabel-transaksi" onClick={this.tabelTransaksi.bind(this)}>
                                <div className={`pilih-tabel-transaksi-desc ${this.state.tabelTransaksi? 'font-biru' : ''}`}>
                                    <div className="title">
                                        Transaksi
                                    </div>
                                    <div className="deskripsi">
                                        Data drop off user
                                    </div>
                                    <div className={`garis ${this.state.tabelTransaksi? 'bg-biru' : ''}`}></div>
                                </div>
                                <div className="pilih-tabel-transaksi-image-tabel"></div>
                            </div>
                            <div className="pilih-tabel-kurir" onClick={this.tabelKurir.bind(this)}>
                                <div className={`pilih-tabel-kurir-desc ${this.state.tabelKurir? 'font-biru' : ''}`}>
                                    <div className="title">
                                        Kurir
                                    </div>
                                    <div className="deskripsi">
                                        Data kurir YFA
                                    </div>
                                    <div className={`garis ${this.state.tabelKurir? 'bg-biru' : ''}`}></div>
                                </div>
                                <div className="pilih-tabel-kurir-image-tabel"></div>
                            </div>
                        </div>
                        <Table title={"Data Transaksi"}
                               color={"rgba(30, 171, 255, 1)"}
                               data={this.state.dataTable}
                               column={this.state.column}
                               search={true}
                               paging={true}
                               filter={false}
                               export={false}/>
                    </div>
                </main>
                <Footer />
            </Fragment>
        );
    }
}

export default MenuAdmin;
