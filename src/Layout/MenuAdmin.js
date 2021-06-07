import React, {Component, Fragment} from 'react';
import Header from "../Components/Header";
import Jumbo from "../Components/Jumbo";
import Footer from "../Components/Footer";
import {Table} from "../Components/Table"
import ModalKu from "../Components/ModalKu"
import bg from "../img/2.jpg"
import '../Style/MenuAdmin.scss'
import axios from "axios";
import {Button, CardHeader, CircularProgress, TextField} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Loading from "../Components/Loading";

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
        }
        this.state = {
            dataTable:[],
            column:[],
            modalInsert : false,
            modalEdit: false,
            initialDataForm: dataForm,
            dataForm : dataForm,
            selectOptionProvince: [],
            selectOptionCityName: [],
            cityId: "",
            selectOptionCityNamePenerima: [],
            cityIdPenerima: "",
            selectOptionLayanan: [],
            setDetail: false,
            display: 'none',
            loadDisplay : 'none'
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

        //reset data on add
        this.setState({
            dataForm : this.state.initialDataForm,
            display : 'none'
        })

        //setting kasar informasi user login
        this.setState(prevState =>({
            dataForm : {
                ...prevState.dataForm,
                email: 'admin',
                statusDelivery: 'Undelivered',
                penerimaPaket: 'penerima',
                fotoPenerima: 'penerima.jpg'
            }
        }));
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

    //request data cost
    async getCost () {
        this.setState({
            loadDisplay : 'block'
        })
        const res = await axios.get("http://localhost:3333/api/cost/" + this.state.cityId + "/" + this.state.cityIdPenerima + "/" + this.state.dataForm.beratBarang, {
            headers: {'Content-Type': 'application/json'}
        })
        const options = res.data.map(cost => ({
            "value": cost.cost[0].value,
            "label": cost.service,
            "title": cost.cost[0].etd
        }))
        this.setState({
            selectOptionLayanan : options,
            display: 'block',
            loadDisplay : 'none'
        })
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

    //handleChange input modal form (pilih provinsi pengirim dan request kota sesuai provinsi)
    async handleChangeProvinsiPengirim (content) {
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

    //handle change input modal form (pilih kota pengirim dan simpan id kota pengirim)
    handleChangeKotaPengirim (content) {
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

    //handleChange input modal form (pilih provinsi penerima dan request kota sesuai provinsi)
    async handleChangeProvinsiPenerima (content) {
        if (content == null) {
            this.setState(prevState =>({
                dataForm : {
                    ...prevState.dataForm,
                    provinceNamePenerima: ""
                }
            }));
        } else {
            this.setState(prevState =>({
                dataForm : {
                    ...prevState.dataForm,
                    provinceNamePenerima: content.label
                }

            }));

            const dataKota = await axios.get("http://localhost:3333/api/kotaRaja/"+content.value, {
                headers : {'Content-Type' : 'application/json'}
            })
            const cityNamePenerima = dataKota.data.map(data => ({
                "value": data.city_id,
                "label": data.type + " " + data.city_name
            }))
            this.setState({selectOptionCityNamePenerima : cityNamePenerima})
        }
    }

    //handle change input modal form (pilih kota penerima dan simpan id kota penerima)
    handleChangeKotaPenerima (content) {
        if (content == null) {
            this.setState(prevState =>({
                dataForm : {
                    ...prevState.dataForm,
                    cityNamePenerima: ""
                }
            }));
        } else {
            this.setState(prevState =>({
                dataForm : {
                    ...prevState.dataForm,
                    cityNamePenerima: content.label
                },
                cityIdPenerima : content.value
            }));
        }
    }

    //handle change input modal form (pilih layanan dan simpan value, label, tittle ke state)
    handleChangeLayanan (content) {
        if (content == null) {
            this.setState(prevState =>({
                dataForm : {
                    ...prevState.dataForm,
                    kategoriLayanan: "",
                    ongkosKirim: "",
                    estimasi: "",
                }
            }));
        } else {
            this.setState(prevState =>({
                dataForm : {
                    ...prevState.dataForm,
                    kategoriLayanan: content.label,
                    ongkosKirim: content.value,
                    estimasi: content.title,
                },
                setDetail : true
            }));
        }
    }

    //post mapping tambah data
    sendDataFormInsert(e) {
        console.log(this.state.dataForm)
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        axios.post("http://localhost:3333/api/transaksi", this.state.dataForm, config).then(res => console.log(res))
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
                    <div style={{paddingTop: '10px', paddingBottom: '25px'}}>
                        <h5>Data Pengirim</h5>
                        <TextField style={{width: '100%'}} onChange={this.handleChange} label="Nama" name="namaPengirim" />
                        <TextField style={{width: '100%'}} onChange={this.handleChange} label="No.Telp" name="telpPengirim" />
                        <Autocomplete
                            options={this.state.selectOptionProvince}
                            getOptionLabel={option => option.label}
                            onChange={(a,content) => {
                                this.handleChangeProvinsiPengirim(content)
                            }}
                            blurOnSelect
                            renderInput={(params) => <TextField {...params} label="Provinsi Pengirim" name="provinceName" onChange={this.handleChange} margin="normal" />}/>
                        <input type="hidden" value={this.state.dataForm.provinceName}/>
                        <Autocomplete
                            options={this.state.selectOptionCityName}
                            getOptionLabel={option => option.label}
                            onChange={(a,content) => {
                                this.handleChangeKotaPengirim(content)
                            }}
                            blurOnSelect
                            renderInput={(params) => <TextField {...params} label="Kota Asal" name="cityName" onChange={this.handleChange} margin="normal" />}/>
                        <input type="hidden" value={this.state.dataForm.cityName}/>
                        <TextField style={{width: '100%'}} onChange={this.handleChange} label="Alamat" name="alamatPengirim" />
                        <TextField style={{width: '100%'}} onChange={this.handleChange} label="Kode Pos" name="kodePosPengirim" />
                    </div>
                    <div style={{paddingTop: '20px', paddingBottom: '25px'}}>
                        <h5>Data Penerima</h5>
                        <TextField style={{width: '100%'}} onChange={this.handleChange} label="Nama" name="namaPenerima" />
                        <TextField style={{width: '100%'}} onChange={this.handleChange} label="No.Telp" name="telpPenerima" />
                        <Autocomplete
                            options={this.state.selectOptionProvince}
                            getOptionLabel={option => option.label}
                            onChange={(a,content) => {
                                this.handleChangeProvinsiPenerima(content)
                            }}
                            blurOnSelect
                            renderInput={(params) => <TextField {...params} label="Provinsi Penerima" name="provinceNamePenerima" onChange={this.handleChange} margin="normal" />}/>
                        <input type="hidden" value={this.state.dataForm.provinceNamePenerima}/>
                        <Autocomplete
                            options={this.state.selectOptionCityNamePenerima}
                            getOptionLabel={option => option.label}
                            onChange={(a,content) => {
                                this.handleChangeKotaPenerima(content)
                            }}
                            blurOnSelect
                            renderInput={(params) => <TextField {...params} label="Kota Tujuan" name="cityNamePenerima" onChange={this.handleChange} margin="normal" />}/>
                        <input type="hidden" value={this.state.dataForm.cityNamePenerima}/>
                        <TextField style={{width: '100%'}} onChange={this.handleChange} label="Alamat" name="alamatPenerima" />
                        <TextField style={{width: '100%'}} onChange={this.handleChange} label="Kode Pos" name="kodePosPenerima" />
                    </div>

                    {this.tabLayanan}
                    <div style={{paddingTop: '20px', paddingBottom: '25px'}}>
                        <h5>Data Barang</h5>
                        <TextField style={{width: '100%'}} onChange={this.handleChange} label="Nama Barang" name="namaBarang" />
                        <TextField style={{width: '100%'}} onChange={this.handleChange} label="Jumlah Barang" name="jumlahBarang" />
                        <TextField style={{width: '100%'}} onChange={this.handleChange} label="Total Berat Barang (gram)" name="beratBarang" />
                    </div>
                    <Button variant="outlined" color="primary"
                            onClick={this.getCost.bind(this)}>
                        Cek Ongkir
                    </Button>
                    <div style={{display:this.state.display}}>
                        <div style={{paddingTop: '20px'}}>
                            <h5>Data Layanan</h5>
                            <Autocomplete
                                options={this.state.selectOptionLayanan}
                                getOptionLabel={option => option.label}
                                onChange={(a,content) => {
                                    this.handleChangeLayanan(content)
                                }}
                                blurOnSelect
                                renderInput={(params) => <TextField {...params} label="Layanan" name="kategoriLayanan" onChange={this.handleChange} margin="normal" />}/>
                            <div className={"total-biaya"} style={{paddingTop: '20px', paddingBottom: '25px'}}>
                                <p>Total Biaya : </p>
                                <p>Rp. <span>{this.state.setDetail? this.state.dataForm.ongkosKirim : 0}</span></p>
                                <p>Estimasi : </p>
                                <p><span>{this.state.setDetail? this.state.dataForm.estimasi : "-"}</span> Hari</p>
                            </div>
                            <div align="right">
                                <Button variant="contained" color="primary" style={{marginRight: '5px'}} onClick={this.sendDataFormInsert}>Insert</Button>
                                <Button variant="outlined" color="primary" style={{marginLeft: '5px'}} onClick={this.modalToggleInsert}>Cancel</Button>
                            </div>
                        </div>
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
                    <h5>Data Pengirim</h5>
                    <TextField style={{width: '100%'}} onChange={this.handleChange} label="Id" name="idTransaksi" value={this.state.dataForm&&this.state.dataForm.idTransaksi}/>
                    <TextField style={{width: '100%'}} onChange={this.handleChange} label="Resi" name="resi" value={this.state.dataForm&&this.state.dataForm.resi}/>
                </div>
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
                    <ModalKu headerColor={'#133671'}
                             namaModalInsert={"Form Transaksi"}
                             namaModalEdit={"Edit Transaksi"}
                             formData={this.state.dataForm}
                             isiFormInsert={this.contentForm()}
                             isiFormEdit={this.contentFormEdit()}
                             modalInsert={this.state.modalInsert}
                             modalEdit={this.state.modalEdit}
                             togglesInsert={this.modalToggleInsert}
                             togglesEdit={this.modalToggleEdit}
                             // saveDataInsert={this.sendDataFormInsert} saveDataEdit={this.sendDataEditForm}
                             />
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
                    <Loading display={this.state.loadDisplay}/>
                </main>
                <Footer />
            </Fragment>
        );
    }
}

export default MenuAdmin;