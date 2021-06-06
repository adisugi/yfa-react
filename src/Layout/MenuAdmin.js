import React, {Component, Fragment} from 'react';
import Header from "../Components/Header";
import Jumbo from "../Components/Jumbo";
import Footer from "../Components/Footer";
import {Table} from "../Components/Table"
import ModalKu from "../Components/ModalKu"
import bg from "../img/2.jpg"
import '../Style/MenuAdmin.scss'
import axios from "axios";
import {Button, TextField} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {optional} from "glamor";


class MenuAdmin extends Component {
    constructor() {
        super();
        let dataForm = {
            idTransaksi: "",
            provinceName: "",
            cityName: "",
            resi: "",
        }
        this.state = {
            dataTable:[],
            column:[],
            modalInsert : false,
            modalEdit: false,
            dataForm : dataForm,
            selectOptionProvince: [],
            selectOptionCityName: [],
            cityId: "",
            selectOptionProvincePenerima: [],
            selectOptionCityNamePenerima: [],
            cityIdPenerima: ""
        }
        this.modalToggleInsert = this.modalToggleInsert.bind(this)
        this.modalToggleEdit = this.modalToggleEdit.bind(this)
        this.sendDataFormInsert = this.sendDataFormInsert.bind(this)
        this.sendDataEditForm = this.sendDataEditForm.bind(this)
        this.selectDataRow = this.selectDataRow.bind(this)
    }

    //action edit data pada tabel
    selectDataRow (data, modal) {
        this.state.dataForm = data
        if (modal === "Edit") {
            this.modalToggleEdit()
        } else {
            // this.modalToggleDelete()
            console.log("Hapus")
        }
    }

    //buka tutup modal insert data
    modalToggleInsert(e) {
        this.setState({modalInsert : !this.state.modalInsert})
    }

    //buka tutup modal edit data
    modalToggleEdit(e) {
        this.setState({modalEdit : !this.state.modalEdit})
    }

    //request data transaksi dan gambar
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
            idTransaksi: content.idTransaksi,
            image: <img src={"data:image/*;base64," + img[index]} alt="foto penerima" style={{width:"100px", borderRadius:"5px"}} />,
            tanggalTransaksi: content.tanggalTransaksi,
            resi: content.resi,
            firstName: content.firstName,
            namaBarang: content.namaBarang,
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

    //request data provinsi
    async getProvinceOption() {
        const res = await axios.get('http://localhost:3333/api/provinsi', {
            headers : {'Content-Type' : 'application/json'}
        })
        const data = res.data
        const option = data.map(item => ({
            "value" : item.province_id,
            "label" : item.province
        }))
        this.setState({selectOptionProvince : option})
    }

    //mounting
    componentDidMount() {
        //set state data transaksi
        this.getDataTransaksi().then(res => {
            this.setState({ dataTable:res })
            this.setState({ column: [
                    // {title: 'id', field: 'id'},
                    {title: 'Tanggal Transaksi', field: 'tanggalTransaksi'},
                    {title: 'No. Resi', field: 'resi'},
                    {title: 'User Name', field: 'firstName'},
                    {title: 'Nama Barang', field: 'namaBarang'},
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
                ]})
        })

        //set state data provinsi
        this.getProvinceOption()

    }

    //handleChange input modal form
    handleChange= (e) =>{
        const {name, value} = e.target;
        this.setState(prevState =>({
            dataForm : {
                ...prevState.dataForm,
                [name]: value
            }
        }));
        console.log(this.state)
    }

    //handleChange input modal form (pilih provinsi penerima dan request kota sesuai provinsi)
    async handleChangeProvinsiPenerima (content) {
        if (content == null) {
            this.setState(prevState =>({
                dataForm : {
                    ...prevState.dataForm,
                    provinceName: ""
                }
            }));
        } else {
            this.setState(prevState =>({
                dataForm : {
                    ...prevState.dataForm,
                    provinceName: content.label
                }

            }));

            const dataKota = await axios.get("http://localhost:3333/api/kotaRaja/"+content.value, {
                headers : {'Content-Type' : 'application/json'}
            })
            const cityName = dataKota.data.map(data => ({
                "value": data.city_id,
                "label": data.type + " " + data.city_name
            }))
            this.setState({selectOptionCityName : cityName})
        }
    }

    //handle change input modal form (pilih kota penerima dan simpan id kota penerima)
    handleChangeKotaPenerima (content) {
        if (content == null) {
            this.setState(prevState =>({
                dataForm : {
                    ...prevState.dataForm,
                    cityName: ""
                }
            }));
        } else {
            this.setState(prevState =>({
                dataForm : {
                    ...prevState.dataForm,
                    cityName: content.label
                },
                cityId : content.value
            }));
        }
    }

    //post mapping tambah data
    sendDataFormInsert(e) {
        this.modalToggleInsert(e)
    }

    //post mapping edit data
    sendDataEditForm(e) {
        this.modalToggleEdit(e)
    }

    //isi form insert
    contentForm () {
        return (
            <Fragment>
                <form>
                    <div>
                        <h3>Form Transaksi</h3>
                    </div>
                    <div>
                        <h4>Data Pengirim</h4>
                        <TextField style={{width: '100%'}} onChange={this.handleChange} label="Id" name="idTransaksi" />
                        <TextField style={{width: '100%'}} onChange={this.handleChange} label="Resi" name="resi" />
                        <Autocomplete
                            options={this.state.selectOptionProvince}
                            getOptionLabel={option => option.label}
                            onChange={(a,content) => {
                                this.handleChangeProvinsiPenerima(content)
                                // console.log(this.state.dataForm)
                            }}
                            blurOnSelect
                            renderInput={(params) => <TextField {...params} label="Provinsi Penerima" name="provinceName" onChange={this.handleChange} margin="normal" />}/>
                        <input type="text" value={this.state.dataForm.provinceName}/>
                        <Autocomplete
                            options={this.state.selectOptionCityName}
                            noOptionsText={"Provinsi Penerima Kosong"}
                            getOptionLabel={option => option.label}
                            onChange={(a,content) => {
                                this.handleChangeKotaPenerima(content)
                            }}
                            blurOnSelect
                            renderInput={(params) => <TextField {...params} label="Kota Penerima" name="cityName" onChange={this.handleChange} margin="normal" />}/>
                        <input type="text" value={this.state.dataForm.cityName}/>
                    </div>
                </form>
            </Fragment>
        )
    }

    //isi form edit
    contentFormEdit () {
        return (
            <Fragment>
                <div>
                    <h3>Edit</h3>
                </div>
                <TextField style={{width: '100%'}} onChange={this.handleChange} label="Id" name="idTransaksi" value={this.state.dataForm&&this.state.dataForm.idTransaksi}/>
                <TextField style={{width: '100%'}} onChange={this.handleChange} label="Resi" name="resi" value={this.state.dataForm&&this.state.dataForm.resi}/>
            </Fragment>
        )
    }

    render() {
        return (
            <Fragment>
                <Header bgNav={"#1EABFF"}/>
                <Jumbo image={bg}
                       jumboAfter={'linear-gradient(to right, rgba(19,54,113,1), rgba(19,54,113,0) 70%)'}
                       title={"Menu Admin"}/>
                <main>
                    <ModalKu formData={this.state.dataForm}
                             isiFormInsert={this.contentForm()}
                             isiFormEdit={this.contentFormEdit()}
                             modalInsert={this.state.modalInsert}
                             modalEdit={this.state.modalEdit}
                             togglesInsert={this.modalToggleInsert}
                             togglesEdit={this.modalToggleEdit}
                             saveDataInsert={this.sendDataFormInsert}
                             saveDataEdit={this.sendDataEditForm}/>
                    <Table title={"Data Transaksi"}
                           color={"rgba(30, 171, 255, 1)"}
                           data={this.state.dataTable}
                           column={this.state.column}
                           search={true}
                           paging={true}
                           filter={false}
                           export={false}
                           actionAdd={this.modalToggleInsert}
                           actionEdit={this.selectDataRow}/>

                </main>
                <Footer />
            </Fragment>
        );
    }
}

export default MenuAdmin;