import React, {Component, Fragment} from 'react';
import Header from "../Components/Header";
import JumbotronKu from "../Components/JumbotronKu";
import Footer from "../Components/Footer";
import {Table} from "../Components/Table"
import ModalKu from "../Components/ModalKu"
import bg from "../img/2.jpg"
import '../Style/MenuAdmin.scss'
import axios from "axios";
import {
    Button, CardActionArea,
    CardMedia,
    FormControl,
    InputLabel,
    Select,
    TextField
} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Loading from "../Components/Loading";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {PhotoCamera} from "@material-ui/icons";
import {Link} from "react-router-dom";

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

            //toggle modal
            modalInsert : false,
            modalEdit: false,
            modalDelete: false,

            //reset form
            initialDataForm: dataForm,

            //tampung data form
            dataForm : dataForm,

            //select option form add data
            selectOptionProvince: [],
            selectOptionCityName: [],
            selectOptionCityNamePenerima: [],
            selectOptionLayanan: [],
            //tampung all data kota, layanan, kurir
            selectOptionCity : [],
            selectOptionLayananEdit: [],
            selectOptionKurir: [],

            //persiapan request cost
            cityId: "",
            cityIdPenerima: "",

            //manipulasi tampilan request layanan
            setDetail: false,
            display: 'none',
            loadDisplay : 'none',
            imageUplod : '',

            //ganti tabel
            tabelTransaksi : true,
            tabelKurir : false
        }
        this.modalToggleInsert = this.modalToggleInsert.bind(this)
        this.modalToggleEdit = this.modalToggleEdit.bind(this)
        this.modalToggleDelete = this.modalToggleDelete.bind(this)
        this.sendDataFormInsert = this.sendDataFormInsert.bind(this)
        this.sendDataFormEdit = this.sendDataFormEdit.bind(this)
        this.dataFormDelete = this.dataFormDelete.bind(this)
        this.selectDataRow = this.selectDataRow.bind(this)
    }

    //action edit dan delete data pada tabel
    async selectDataRow (data, modal) {
        await this.setState({
            dataForm : data,
            imageUplod : data.image.props.src
        })
        // this.state.dataForm = data
        // this.state.displayImage = 'none'
        // this.state.imageUplod = data.image.props.src
        if (modal === "Edit") {

            this.modalToggleEdit()
        } else if (modal === 'Delete') {
            this.modalToggleDelete()
        }
    }

    //buka tutup modal insert data
    modalToggleInsert(e) {
        this.setState({modalInsert : !this.state.modalInsert})
        this.reset()
    }

    //buka tutup modal edit data
    modalToggleEdit(e) {
        this.setState({modalEdit : !this.state.modalEdit})
    }

    //buka tutup modal delete
    modalToggleDelete(e) {
        this.setState({
            modalDelete : !this.state.modalDelete
        })
    }

    //request data transaksi dan gambar
    async getDataTransaksi() {
        const res = await axios.get("http://localhost:3333/api/transaksi/admin", {
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
            firstName: content.firstName,
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

    //request all data kota
    async getCity() {
        const city = await axios.get("http://localhost:3333/api/kotaRaja", {
            headers : {'Content-Type' : 'application/json'}
        })
        const dataCity = city.data.map(res => ({
            "value" : res.city_id,
            "label": res.type + " " + res.city_name
        }))
        this.setState({selectOptionCity : dataCity})
    }
    //data layanan
    setLayananEdit() {
        const kategoriLayanan = ["REG", "YES", "OKE", "CTC", "CTCYES"].map(layanan => ({
            'label' : layanan
        }))
        this.setState({selectOptionLayananEdit : kategoriLayanan})
    }

    //request data kurir
    async getKurir() {
        const res = await axios.get("http://localhost:3333/api/kurir", {
            headers : {'Content-Type' : 'application/json'}
        })
        const kurir = res.data.map(ponse => ({
            "value" : ponse.idKurir,
            "label" : ponse.namaKurir
        }))
        this.setState({selectOptionKurir : kurir})
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
                ]})
        })

        //set state data provinsi
        this.getProvinceOption()

        //set state all data kota
        this.getCity();

        //set state all data layanan
        this.setLayananEdit();

        this.getKurir();
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
        // console.log(this.state)
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

    //handle change input modal form (pilih kurir)
    handleChangeKurir (content) {
        if (content == null) {
            this.setState(prevState =>({
                dataForm : {
                    ...prevState.dataForm,
                    idKurir: "",
                    namaKurir: "",
                }
            }));
        } else {
            this.setState(prevState =>({
                dataForm : {
                    ...prevState.dataForm,
                    idKurir: content.value,
                    namaKurir: content.label,
                },
            }));
        }
    }

    //handleChangePreview
    handleChangePreview(e) {
        let url = URL.createObjectURL(e.target.files[0]);
        // console.log(e.target.files[0])
        // console.log(url)
        this.setState({
            imageUplod : url
        })
        this.setState(prevState =>({
            dataForm : {
                ...prevState.dataForm,
                image: e.target.files[0],
            },
        }));
    }

    //post mapping tambah data
    async sendDataFormInsert(e) {
        this.setState({
            loadDisplay : 'block'
        })
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        await axios.post("http://localhost:3333/api/transaksi", this.state.dataForm, config)
            .then(res => {
                // const dataUpdate = this.state.dataTable.concat(res.data)
                // this.setState({ dataTable:dataUpdate })
                this.getDataTransaksi().then(response => {
                    this.setState({
                        dataTable: response,
                        loadDisplay: 'none'
                    })
                })
            })
        this.modalToggleInsert(e)
    }

    //post mapping edit data
    sendDataFormEdit(e) {
        const formData = new FormData();
        const json = JSON.stringify({
            "alamatPenerima": this.state.dataForm.alamatPenerima,
            "alamatPengirim": this.state.dataForm.alamatPengirim,
            "beratBarang": this.state.dataForm.beratBarang,
            "cityName": this.state.dataForm.cityName,
            "cityNamePenerima": this.state.dataForm.cityNamePenerima,
            "estimasi": this.state.dataForm.estimasi,
            "email" : "admin",
            "idKurir": this.state.dataForm.idKurir,
            "idTransaksi": this.state.dataForm.idTransaksi,
            "idPengirim": this.state.dataForm.idPengirim,
            "idPenerima": this.state.dataForm.idPenerima,
            "isDelete" : this.state.dataForm.isDelete,
            "jumlahBarang": this.state.dataForm.jumlahBarang,
            "kategoriLayanan": this.state.dataForm.kategoriLayanan,
            "kodePosPenerima": this.state.dataForm.kodePosPenerima,
            "kodePosPengirim": this.state.dataForm.kodePosPengirim,
            "namaBarang": this.state.dataForm.namaBarang,
            "namaKurir": this.state.dataForm.namaKurir,
            "namaPenerima": this.state.dataForm.namaPenerima,
            "namaPengirim": this.state.dataForm.namaPengirim,
            "ongkosKirim": this.state.dataForm.ongkosKirim,
            "penerimaPaket": this.state.dataForm.penerimaPaket,
            "provinceName": this.state.dataForm.provinceName,
            "provinceNamePenerima": this.state.dataForm.provinceNamePenerima,
            "statusDelivery": this.state.dataForm.statusDelivery,
            "tanggalTransaksi": this.state.dataForm.tanggalTransaksi,
            "telpPenerima": this.state.dataForm.telpPenerima,
            "telpPengirim": this.state.dataForm.telpPengirim
        })

        const blob = new Blob([json], {
            type: "application/json"
        })

        formData.append("foto", this.state.dataForm.image)
        formData.append("transaksi", blob)

        this.setState({
            loadDisplay : 'block'
        })

        const config = {
            headers: {
                "content-type": "multipart/mixed",
            }
        }

        axios.post("http://localhost:3333/api/transaksi/admin", formData, config)
            .then(res => {
                this.getDataTransaksi().then(response => {
                    this.setState({
                        dataTable:response,
                        loadDisplay: 'none'
                    })
            })
        })

        // "fotoPenerima": File {name: "R2df1752f0c2cd444d33cd6b1d798d4a9.jpg", lastModified: 1618734546600, lastModifiedDate: Sun Apr 18 2021 15:29:06 GMT+0700 (Western Indonesia Time), webkitRelativePath: "", size: 365422, …}
        this.modalToggleEdit(e)
    }

    //delete mapping
    async dataFormDelete(e) {
        this.setState({
            loadDisplay : 'block'
        })

        const data = this.state.dataForm
        const config = {
            headers: {
                "content-type": "application/json",
            }
        }
        await axios.post("http://localhost:3333/api/transaksi/delete", data, config)
                .then(res => {
                    this.getDataTransaksi().then(response => {
                        this.setState({
                            dataTable : response,
                            loadDisplay : 'none'
                        })
                    })
                    console.log('Deleted Successfully.');
                })
        this.modalToggleDelete(e)
    }

    //reset form
    reset() {
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

    //isi form insert
    contentForm () {
        return (
            <Fragment>
                <form>
                    <div style={{paddingTop: '10px', paddingBottom: '25px'}}>
                        <h5>Data Pengirim</h5>
                        <TextField style={{width: '100%'}} onChange={this.handleChange} label="Nama" name="namaPengirim" />
                        <TextField style={{width: '100%'}}
                                   inputProps={{maxLength:13}}
                                   onChange={this.handleChange}
                                   label="No.Telp"
                                   name="telpPengirim" />
                        <Autocomplete
                            options={this.state.selectOptionProvince}
                            getOptionLabel={option => option.label}
                            onChange={(a,content) => {
                                this.handleChangeProvinsiPengirim(content)
                            }}
                            blurOnSelect
                            renderInput={(params) => <TextField {...params} label="Provinsi Pengirim" name="provinceName" onChange={this.handleChange} margin="normal" />}/>
                        <Autocomplete
                            options={this.state.selectOptionCityName}
                            getOptionLabel={option => option.label}
                            onChange={(a,content) => {
                                this.handleChangeKotaPengirim(content)
                            }}
                            blurOnSelect
                            renderInput={(params) => <TextField {...params} label="Kota Asal" name="cityName" onChange={this.handleChange} margin="normal" />}/>
                        <TextField style={{width: '100%'}} onChange={this.handleChange} label="Alamat" name="alamatPengirim" />
                        <TextField
                            style={{width: '100%'}}
                            inputProps={{maxLength:5}}
                            onChange={this.handleChange}
                            label="Kode Pos"
                            name="kodePosPengirim" />
                    </div>
                    <div style={{paddingTop: '20px', paddingBottom: '25px'}}>
                        <h5>Data Penerima</h5>
                        <TextField style={{width: '100%'}} onChange={this.handleChange} label="Nama" name="namaPenerima" />
                        <TextField style={{width: '100%'}}
                                   inputProps={{maxLength:13}}
                                   onChange={this.handleChange}
                                   label="No.Telp"
                                   name="telpPenerima" />
                        <Autocomplete
                            options={this.state.selectOptionProvince}
                            getOptionLabel={option => option.label}
                            onChange={(a,content) => {
                                this.handleChangeProvinsiPenerima(content)
                            }}
                            blurOnSelect
                            renderInput={(params) => <TextField {...params} label="Provinsi Penerima" name="provinceNamePenerima" onChange={this.handleChange} margin="normal" />}/>
                        <Autocomplete
                            options={this.state.selectOptionCityNamePenerima}
                            getOptionLabel={option => option.label}
                            onChange={(a,content) => {
                                this.handleChangeKotaPenerima(content)
                            }}
                            blurOnSelect
                            renderInput={(params) => <TextField {...params} label="Kota Tujuan" name="cityNamePenerima" onChange={this.handleChange} margin="normal" />}/>
                        <TextField style={{width: '100%'}} onChange={this.handleChange} label="Alamat" name="alamatPenerima" />
                        <TextField
                            style={{width: '100%'}}
                            inputProps={{maxLength:5}}
                            onChange={this.handleChange}
                            label="Kode Pos"
                            name="kodePosPenerima" />
                    </div>

                    <div style={{paddingTop: '20px', paddingBottom: '25px'}}>
                        <h5>Data Barang</h5>
                        <TextField style={{width: '100%'}} onChange={this.handleChange} label="Nama Barang" name="namaBarang" />
                        <TextField style={{width: '100%'}} onChange={this.handleChange} label="Jumlah Barang" name="jumlahBarang" />
                        <TextField style={{width: '100%'}} onChange={this.handleChange} label="Total Berat Barang (gram)" name="beratBarang" />
                    </div>
                    <Button variant="outlined" color="primary"
                            onClick={this.getCost.bind(this)}>
                        Cek Layanan
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
                <form>
                    <div style={{paddingTop: '10px', paddingBottom: '25px'}}>
                        <h5>Data Pengirim</h5>
                        <TextField style={{width: '100%'}} onChange={this.handleChange} label="Nama" name="namaPengirim" value={this.state.dataForm && this.state.dataForm.namaPengirim}/>
                        <TextField style={{width: '100%'}}
                                   inputProps={{maxLength:13}}
                                   onChange={this.handleChange}
                                   label="No.Telp"
                                   name="telpPengirim"
                                   value={this.state.dataForm && this.state.dataForm.telpPengirim}/>
                        <Autocomplete
                            options={this.state.selectOptionProvince}
                            getOptionLabel={option => option.label}
                            defaultValue={this.state.selectOptionProvince.find(v => v.label === this.state.dataForm.provinceName)}
                            onChange={(a,content) => {
                                this.handleChangeProvinsiPengirim(content)
                            }}
                            blurOnSelect
                            renderInput={(params) => <TextField {...params} label="Provinsi Pengirim" name="provinceName" onChange={this.handleChange} margin="normal" value={this.state.dataForm && this.state.dataForm.provinceName} />}/>
                        <Autocomplete
                            options={this.state.selectOptionCityName}
                            getOptionLabel={option => option.label}
                            defaultValue={this.state.selectOptionCity.find(v => v.label === this.state.dataForm.cityName)}
                            onChange={(a,content) => {
                                this.handleChangeKotaPengirim(content)
                            }}
                            blurOnSelect
                            renderInput={(params) => <TextField {...params} label="Kota Asal" name="cityName" onChange={this.handleChange} margin="normal" value={this.state.dataForm && this.state.dataForm.cityName}/>}/>
                        <TextField style={{width: '100%'}} onChange={this.handleChange} label="Alamat" name="alamatPengirim" value={this.state.dataForm && this.state.dataForm.alamatPengirim}/>
                        <TextField
                            style={{width: '100%'}}
                            inputProps={{maxLength:5}}
                            onChange={this.handleChange}
                            label="Kode Pos"
                            name="kodePosPengirim"
                            value={this.state.dataForm && this.state.dataForm.kodePosPengirim}/>
                    </div>
                    <div style={{paddingTop: '20px', paddingBottom: '25px'}}>
                        <h5>Data Penerima</h5>
                        <TextField style={{width: '100%'}} onChange={this.handleChange} label="Nama" name="namaPenerima" value={this.state.dataForm && this.state.dataForm.namaPenerima}/>
                        <TextField style={{width: '100%'}}
                                   inputProps={{maxLength:13}}
                                   onChange={this.handleChange}
                                   label="No.Telp"
                                   name="telpPenerima"
                                   value={this.state.dataForm && this.state.dataForm.telpPenerima}/>
                        <Autocomplete
                            options={this.state.selectOptionProvince}
                            getOptionLabel={option => option.label}
                            defaultValue={this.state.selectOptionProvince.find(v => v.label === this.state.dataForm.provinceNamePenerima)}
                            onChange={(a,content) => {
                                this.handleChangeProvinsiPenerima(content)
                            }}
                            blurOnSelect
                            renderInput={(params) => <TextField {...params} label="Provinsi Penerima" name="provinceNamePenerima" onChange={this.handleChange} margin="normal" value={this.state.dataForm && this.state.dataForm.provinceNamePenerima}/>}/>
                        <Autocomplete
                            options={this.state.selectOptionCityNamePenerima}
                            getOptionLabel={option => option.label}
                            defaultValue={this.state.selectOptionCity.find(v => v.label === this.state.dataForm.cityNamePenerima)}
                            onChange={(a,content) => {
                                this.handleChangeKotaPenerima(content)
                            }}
                            blurOnSelect
                            renderInput={(params) => <TextField {...params} label="Kota Tujuan" name="cityNamePenerima" onChange={this.handleChange} margin="normal" value={this.state.dataForm && this.state.dataForm.cityNamePenerima}/>}/>
                        <TextField style={{width: '100%'}} onChange={this.handleChange} label="Alamat" name="alamatPenerima" value={this.state.dataForm && this.state.dataForm.alamatPenerima}/>
                        <TextField
                            style={{width: '100%'}}
                            inputProps={{maxLength:5}}
                            onChange={this.handleChange}
                            label="Kode Pos"
                            name="kodePosPenerima"
                            value={this.state.dataForm && this.state.dataForm.kodePosPenerima}/>
                    </div>
                    <div style={{paddingTop: '20px', paddingBottom: '25px'}}>
                        <h5>Data Barang</h5>
                        <TextField style={{width: '100%'}} onChange={this.handleChange} label="Nama Barang" name="namaBarang" value={this.state.dataForm && this.state.dataForm.namaBarang} />
                        <TextField style={{width: '100%'}} onChange={this.handleChange} label="Jumlah Barang" name="jumlahBarang" value={this.state.dataForm && this.state.dataForm.jumlahBarang}/>
                        <TextField style={{width: '100%'}} onChange={this.handleChange} label="Total Berat Barang (gram)" name="beratBarang" value={this.state.dataForm && this.state.dataForm.beratBarang}/>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Button variant="outlined" color="primary"
                                onClick={this.getCost.bind(this)}>
                            Cek Layanan
                        </Button>
                    </div>
                    <div style={{paddingTop: '30px'}}>
                        <h5>Data Layanan</h5>
                        <Autocomplete
                            options={this.state.selectOptionLayanan}
                            getOptionLabel={option => option.label}
                            defaultValue={this.state.selectOptionLayananEdit.find(v => v.label === this.state.dataForm.kategoriLayanan)}
                            onChange={(a,content) => {
                                this.handleChangeLayanan(content)
                            }}
                            blurOnSelect
                            renderInput={(params) => <TextField {...params} label="Layanan" name="kategoriLayanan" onChange={this.handleChange} margin="normal" />}/>
                        <div className={"total-biaya"} style={{paddingTop: '20px', paddingBottom: '25px'}}>
                            <p>Total Biaya : </p>
                            <p>Rp. <span>{this.state.dataForm.ongkosKirim}</span></p>
                            <p>Estimasi : </p>
                            <p><span>{this.state.dataForm.estimasi}</span> Hari</p>
                        </div>
                    </div>
                    <div style={{paddingTop: '20px', paddingBottom: '25px'}}>
                        <h5>Detail Transaksi</h5>
                        <Autocomplete
                            options={this.state.selectOptionKurir}
                            getOptionLabel={option => option.label}
                            defaultValue={this.state.selectOptionKurir.find(v => v.label === this.state.dataForm.namaKurir)}
                            onChange={(a,content) => {
                                this.handleChangeKurir(content)
                            }}
                            blurOnSelect
                            renderInput={(params) => <TextField {...params} label="Kurir" name="namaKurir" onChange={this.handleChange} margin="normal" />}/>
                        <TextField style={{width: '100%'}} onChange={this.handleChange} label="Penerima Paket" name="penerimaPaket" value={this.state.dataForm && this.state.dataForm.penerimaPaket}/>
                        <FormControl style={{width : '100%'}}>
                            <InputLabel htmlFor="age-native-simple">Status</InputLabel>
                            <Select
                                native
                                value={this.state.dataForm && this.state.dataForm.statusDelivery}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'statusDelivery',
                                    id: 'age-native-simple',
                                }}>
                                <option value={'Menunggu Pembayaran'}>Menunggu Pembayaran</option>
                                <option value={'Sedang diproses'}>Sedang diproses</option>
                                <option value={'Terkirim'}>Terkirim</option>
                                <option value={'Gagal Terkirim'}>Gagal Terkirim</option>
                            </Select>
                        </FormControl>
                        <div style={{marginTop: '20px'}}>
                            <input accept="image/*" style={{display : 'none'}}
                                   id="icon-button-file" type="file" name='fotoPenerima'
                                   onChange={this.handleChangePreview.bind(this)}/>
                            <label htmlFor="icon-button-file">
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    <PhotoCamera />
                                </IconButton>
                                <span style={{color: '#3f51b5', fontWeight: 'bold'}}>Upload Gambar</span>
                            </label>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Foto Penerima"
                                    height="50%"
                                    image={this.state.imageUplod}
                                    title="Foto Penerima"
                                />
                            </CardActionArea>
                        </div>

                    </div>

                    <div align="right">
                        <Button variant="contained" color="primary" style={{marginRight: '5px'}} onClick={this.sendDataFormEdit}>Insert</Button>
                        <Button variant="outlined" color="primary" style={{marginLeft: '5px'}} onClick={this.modalToggleEdit}>Cancel</Button>
                    </div>
                </form>
            </Fragment>
        )
    }

    //isi form delete
    contentFormDelete () {
        return (
            <Fragment>
                <div style={{width: '100%', textAlign: 'center'}}>
                    <HighlightOffIcon style={{color: '#e23d28', fontSize: '100'}}/>
                </div>
                <div style={{margin: '20px', textAlign: 'center'}}>
                    <h4>Yakin?</h4>
                    <p style={{margin: '0', color: 'rgba(0,0,0,.5)'}}>Data ini akan hilang saat menekan tombol "Delete"</p>
                    <p style={{margin: '5px', color: 'rgba(0,0,0,.5)'}}>Tekan "Cancel" untuk membatalkan</p>
                </div>
                <div align="center">
                    <Button style={{marginRight: '5px', background: '#e23d28', color: '#fff'}} onClick={this.dataFormDelete}>Delete</Button>
                    <Button style={{marginLeft: '5px', border: '1px solid #e23d28', color: '#e23d28'}} onClick={this.modalToggleDelete}>Cancel</Button>
                </div>
            </Fragment>
        )
    }

    //pindah table
    tabelTransaksi () {
        this.setState({
            tabelTransaksi : true,
            tabelKurir : false
        })
        const link = document.createElement("a")
        link.href = "/#/admin/transaksi"
        document.body.appendChild(link)
        link.click()
    }
    tabelKurir () {
        this.setState({
            tabelTransaksi : false,
            tabelKurir : true
        })
        const link = document.createElement("a")
        link.href = "/#/kurir"
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
                               export={false}
                               actionAdd={this.modalToggleInsert}
                               actionEdit={this.selectDataRow}
                               actionDelete={this.selectDataRow}/>
                        <ModalKu headerColor={'#133671'}
                                 namaModalInsert={"Form Transaksi"}
                                 namaModalEdit={"Edit Transaksi"}
                                 formData={this.state.dataForm}
                                 isiFormInsert={this.contentForm()}
                                 isiFormEdit={this.contentFormEdit()}
                                 isiFormAlert={this.contentFormDelete()}
                                 modalInsert={this.state.modalInsert}
                                 modalEdit={this.state.modalEdit}
                                 modalAlert={this.state.modalDelete}
                                 togglesInsert={this.modalToggleInsert}
                                 togglesEdit={this.modalToggleEdit}
                                 togglesAlert={this.modalToggleDelete}/>
                        <Loading display={this.state.loadDisplay}/>
                    </div>
                </main>
                <Footer />
            </Fragment>
        );
    }
}

export default MenuAdmin;