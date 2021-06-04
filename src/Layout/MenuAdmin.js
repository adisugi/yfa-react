import React, {Component, Fragment} from 'react';
import Header from "../Components/Header";
import Jumbo from "../Components/Jumbo";
import Footer from "../Components/Footer";
import {Table} from "../Components/Table"
import bg from "../img/2.jpg"
import axios from "axios";


class MenuAdmin extends Component {
    constructor() {
        super();
        this.state= {
            dataTable:[],
            column:[]
        }
    }

    async getDataTransaksi() {
        const res = await axios.get("http://localhost:3333/api/transaksi", {
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
            image: <img src={"data:image/*;base64," + img[index]} alt="foto penerima" style={{width:"100px", borderRadius:"5px"}} />,
            tanggalTransaksi: content.tanggalTransaksi,
            resi: content.resi,
            userName: content.firstName,
            barang: content.namaBarang,
            berat: content.beratBarang,
            pengirim: content.namaPengirim,
            provPengirim: content.provinceName,
            kotaPengirim: content.cityName,
            alamatPengirim: content.alamatPengirim,
            telpPengirim: content.telpPengirim,
            kodePosPengirim: content.kodePosPengirim,
            penerima: content.namaPenerima,
            provPenerima: content.provinceNamePenerima,
            kotaPenerima: content.cityNamePenerima,
            alamatPenerima: content.alamatPenerima,
            telpPenerima: content.telpPenerima,
            kodePosPenerima: content.kodePosPenerima,
            layanan: content.kategoriLayanan,
            ongkir: content.ongkosKirim,
            estimasi: content.estimasi,
            status: content.statusDelivery,
            kurir: content.namaKurir,
            penerimaPaket: content.penerimaPaket
        }))
        return dataTable
    }

    componentDidMount() {
        this.getDataTransaksi().then(res => {
            this.setState({ dataTable:res })
            this.setState({ column: [
                    {title: 'Tanggal Transaksi', field: 'tanggalTransaksi'},
                    {title: 'No. Resi', field: 'resi'},
                    {title: 'User Name', field: 'userName'},
                    {title: 'Nama Barang', field: 'barang'},
                    {title: 'Berat Barang (gram)', field: 'berat'},
                    {title: 'Pengirim', field: 'pengirim'},
                    {title: 'Provinsi Pengirim', field: 'provPengirim'},
                    {title: 'Kota Pengirim', field: 'kotaPengirim'},
                    {title: 'Alamat Pengirim', field: 'alamatPengirim'},
                    {title: 'Telp. Pengirim', field: 'telpPengirim'},
                    {title: 'Kode Pos Pengirim', field: 'kodePosPengirim'},
                    {title: 'Penerima', field: 'penerima'},
                    {title: 'Provinsi Penerima', field: 'provPenerima'},
                    {title: 'Kota Penerima', field: 'kotaPenerima'},
                    {title: 'Alamat Penerima', field: 'alamatPenerima'},
                    {title: 'Telp. Penerima', field: 'telpPenerima'},
                    {title: 'Kode Pos Penerima', field: 'kodePosPenerima'},
                    {title: 'Layanan', field: 'layanan'},
                    {title: 'Ongkir (Rp)', field: 'ongkir'},
                    {title: 'Estimasi (Hari)', field: 'estimasi'},
                    {title: 'Nama Kurir', field: 'kurir'},
                    {title: 'Penerima Paket', field: 'penerimaPaket'},
                    {title: 'Status', field: 'status'},
                    {title: 'Foto Penerima', field: 'image'}
                ]})
        })
    }


    render() {
        return (
            <Fragment>
                <Header bgNav={"#1EABFF"}/>
                <Jumbo image={bg}
                       jumboAfter={'linear-gradient(to right, rgba(19,54,113,1), rgba(19,54,113,0) 70%)'}
                       title={"Menu Admin"}/>
                <main>
                    <Table title={"Data Transaksi"}
                           data={this.state.dataTable}
                           column={this.state.column}
                           search={true}
                           paging={true}
                           filter={false}
                           export={true}/>
                </main>
                <Footer />
            </Fragment>
        );
    }
}

export default MenuAdmin;