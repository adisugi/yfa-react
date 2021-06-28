import React, {Fragment} from 'react'
import Header from "../Components/Header";
import JumbotronKu from "../Components/JumbotronKu";
import Footer from "../Components/Footer";
import axios from "axios";
import {Button} from 'reactstrap';
import bg from "../img/2.jpg";
import {Table} from "../Components/Table";
import ModalKu from "../Components/ModalKu";
import {CardActionArea, CardMedia, TextField} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {PhotoCamera} from "@material-ui/icons";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

class TableData extends React.Component {
    constructor() {
        super();
        let dataForm = {
            namaKurir: "",
            noTelpKurir: "",
            nik:"",
            ttl:"",
            alamat:"",
            file: "",
            isDelete: ""
        }
        this.state = {
            dataTable: [],
            column: [],
            modal: false,
            modalEdit: false,
            modalDelete: false,

            //ganti tabel
            tabelTransaksi: false,
            tabelKurir: true,
            hiddenFoto: "none",

            id: 0,
            dataForm: dataForm,
            imageUplod: ''
        }
        this.toggle = this.toggle.bind(this)
        this.modalToggleEdit = this.modalToggleEdit.bind(this)
        this.selectDataRow = this.selectDataRow.bind(this)
        this.sendDataFormInsert = this.sendDataFormInsert.bind(this)
        this.sendDataEditForm = this.sendDataEditForm.bind(this)
        this.toggleDelete = this.toggleDelete.bind(this)
        this.dataFormDelete = this.dataFormDelete.bind(this)

    }

    //action edit data pada tabel
    selectDataRow(data, modal) {
        this.state.dataForm = data
        // this.state.displayImage = "none"
        this.state.imageUplod = data.image.props.src
        if (modal === "Edit") {
            // console.log(this.state.dataForm)
            this.modalToggleEdit()
        } else {
            this.toggleDelete()
            console.log("Hapus")
        }
    }

    //modal insert
    toggle(sesuatu) {
        this.setState({
            modal: !this.state.modal,
            hiddenFoto: "none"
        });
    }

    //modal edit
    modalToggleEdit(e) {
        this.setState({modalEdit: !this.state.modalEdit})
    }

    //modal delete
    toggleDelete(e) {
        this.setState({
            modalDelete: !this.state.modalDelete
        })
    }

    //ngambil data di tabel
    async getDataKurir() {
        const res = await axios.get("http://localhost:3333/api/kurir"
        //     , {
        //     headers: {'Content-Type': 'application/json'}
        // }
        )

        let img = [];
        for (let i = 0; i < res.data.length; i++) {
            const dataImage = await axios.get("http://localhost:3333/api/kurir/getImage/" + res.data[i].idKurir
            //     , {
            //     headers: {'Content-Type': 'application/json'}
            // }
            )
            img.push(dataImage.data)
        }

        const data = res.data
        const dataTable = data.map((content, index) => ({
            idKurir: content.idKurir,
            image: <img src={"data:image/*;base64," + img[index]} alt="foto kurir"
                        style={{width: "100px", borderRadius: "5px"}}/>,
            namaKurir: content.namaKurir,
            noTelpKurir: content.noTelpKurir,
            nik:content.nik,
            ttl:content.ttl,
            alamat:content.alamat,
            isDelete: content.isDelete,
            file: content.file
        }))
        return dataTable
    }

    //awal web dijalanin
    componentDidMount() {
        this.getDataKurir().then(res => {
            this.setState({dataTable: res})
            this.setState({
                column: [
                    // {title: 'id', field: 'id'},
                    {title: 'Id Kurir', field: 'idKurir'},
                    {title: 'Nama Kurir', field: 'namaKurir'},
                    {title: 'No Telp Kurir', field: 'noTelpKurir'},
                    {title: 'Nik', field: 'nik'},
                    {title: 'TTL', field: 'ttl'},
                    {title: 'Alamat', field: 'alamat'},
                    {title: 'File', field: 'image'}
                ]
            })
        })
    }

    //post mapping tambah data
    sendDataFormInsert = (e) => {
        const formData = new FormData();
        const json = JSON.stringify({
            "namaKurir": this.state.dataForm.namaKurir,
            "noTelpKurir": this.state.dataForm.noTelpKurir,
            "nik":this.state.dataForm.nik,
            "ttl":this.state.dataForm.ttl,
            "alamat":this.state.dataForm.alamat
        });

        const blobDoc = new Blob([json], {
            type: "application/json"
        });

        formData.append("file", this.state.dataForm.file)
        formData.append("kurir", blobDoc)

        const config = {
            headers: {
                "content-type": "multipart/mixed",
            }
        }

        axios.post("http://localhost:3333/api/kurir/upload", formData, config)
            .then(res => {
                this.getDataKurir().then(response => {
                    this.setState({dataTable: response})
                })
            })

        this.toggle(e)
        console.log(this.state.dataTable)

    }

    //post mapping edit data
    sendDataEditForm = (e) => {
        const formData = new FormData();
        const json = JSON.stringify({
            "idKurir": this.state.dataForm.idKurir,
            "namaKurir": this.state.dataForm.namaKurir,
            "noTelpKurir": this.state.dataForm.noTelpKurir,
            "nik":this.state.dataForm.nik,
            "ttl":this.state.dataForm.ttl,
            "alamat":this.state.dataForm.alamat
        });

        const blobDoc = new Blob([json], {
            type: "application/json"
        });

        formData.append("file", this.state.dataForm.file)
        formData.append("kurir", blobDoc)

        const config = {headers: {"content-type": "multipart/mixed",}}

        axios.post("http://localhost:3333/api/kurir/upload", formData, config)
            .then(res => {
                this.getDataKurir().then(response => {
                    this.setState({dataTable: response})
                })
            })

        this.modalToggleEdit(e)
        console.log(this.state.dataTable)
    }

    //delete mapping
    dataFormDelete(rowData) {

        const data = this.state.dataForm
        const config = {
            headers: {
                "content-type": "application/json",
            }
        }

        console.log(rowData)
        axios.post(`http://localhost:3333/api/kurir/delete`, data, config)
            .then(res => {
                this.getDataKurir().then(response => {
                    this.setState({dataTable: response})
                })
                console.log('Deleted Successfully.');
            })
        //memanggil modal delete
        this.toggleDelete(rowData)
    }

    //handleChange input modal form
    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState(prevState => ({
            dataForm: {
                ...prevState.dataForm,
                [name]: value
            }
        }));
    }

    //handleFileChange input file
    handleFileChange = (e) => {
        let url = URL.createObjectURL(e.target.files[0]);
        this.setState({
            imageUplod: url,
            hiddenFoto: "block"

        })
        this.setState(prevState => ({
            dataForm: {
                ...prevState.dataForm,
                file: e.target.files[0]

            }
        }));
        //this.setState({[e.target.name]: e.target.files[0]})
    }

    //isi form data kurir
    contentForm() {
        return (
            <Fragment>
                <form>
                    <div style={{paddingTop: '10px', paddingBottom: '25px'}}>
                        <h5>Data Pengirim</h5>
                        <TextField style={{width: '100%'}} onChange={this.handleChange} label="Nama Kurir"
                                   name="namaKurir"/>
                        <TextField style={{width: '100%'}} onChange={this.handleChange} label="Nik"
                                   name="nik" inputProps={{maxLength: 16}}/>
                        <TextField style={{width: '100%'}} onChange={this.handleChange} label="TTL"
                                   type="date"
                                   defaultValue="2021-06-29"
                                   name="ttl"/>
                        <TextField style={{width: '100%'}} onChange={this.handleChange} label="Alamat"
                                   name="alamat"/>
                        <TextField style={{width: '100%'}}
                                   onChange={this.handleChange}
                                   label="No.Telp Kurir"
                                   name="noTelpKurir"
                                   inputProps={{maxLength: 13}}/>
                        <div style={{marginTop: '20px'}}>
                            <input accept="image/*" style={{display: 'none'}}
                                   id="icon-button-file" type="file" name='file'
                                   onChange={this.handleFileChange.bind(this)}/>
                            <label htmlFor="icon-button-file">
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    <PhotoCamera/>
                                </IconButton>
                                <span style={{color: '#3f51b5', fontWeight: 'bold'}}>Upload Gambar</span>
                            </label>
                            <CardActionArea style={{display: this.state.hiddenFoto}}>
                                <CardMedia
                                    component="img"
                                    alt="Foto Kurir"
                                    height="50%"
                                    image={this.state.imageUplod}
                                    title="Foto Kurir"
                                />
                            </CardActionArea>
                        </div>

                        <div align="right" style={{paddingTop: "15px"}}>
                            <Button variant="contained" color="primary" style={{marginRight: '5px'}}
                                    onClick={this.sendDataFormInsert}>Insert</Button>
                            <Button variant="outlined" color="primary" style={{marginLeft: '5px'}}
                                    onClick={this.toggle}>Cancel</Button>
                        </div>
                    </div>
                </form>
            </Fragment>
        )
    }

    //edit form data kurir
    contentFormEdit() {
        return (
            <Fragment>
                <form>
                    <div style={{paddingTop: '10px', paddingBottom: '25px'}}>
                        <h5>Data Pengirim</h5>

                        <TextField style={{width: '100%'}} onChange={this.handleChange} label="Nama Kurir"
                                   name="namaKurir" value={this.state.dataForm && this.state.dataForm.namaKurir}/>
                        <TextField style={{width: '100%'}} onChange={this.handleChange} label="Nik"
                                   name="nik" value={this.state.dataForm && this.state.dataForm.nik}/>
                        <TextField style={{width: '100%'}} onChange={this.handleChange} label="TTL" type="date"
                                   name="ttl" value={this.state.dataForm && this.state.dataForm.ttl}/>
                        <TextField style={{width: '100%'}} onChange={this.handleChange} label="Alamat"
                                   name="alamat" value={this.state.dataForm && this.state.dataForm.alamat}/>
                        <TextField style={{width: '100%'}} onChange={this.handleChange} label="No.Telp Kurir"
                                   name="noTelpKurir" inputProps={{maxLength: 13}}
                                   value={this.state.dataForm && this.state.dataForm.noTelpKurir}/>
                        <div style={{marginTop: '20px'}}>
                            <input accept="image/*" style={{display: 'none'}}
                                   id="icon-button-file" type="file" name='file'
                                   onChange={this.handleFileChange.bind(this)}/>
                            <label htmlFor="icon-button-file">
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    <PhotoCamera/>
                                </IconButton>
                                <span style={{color: '#3f51b5', fontWeight: 'bold'}}>Upload Gambar</span>
                            </label>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Foto Kurir"
                                    height="50%"
                                    image={this.state.imageUplod}
                                    title="Foto Kurir"
                                />
                            </CardActionArea>
                        </div>

                        <div align="right" style={{marginTop: "20px"}}>
                            <Button variant="contained" color="primary" style={{marginRight: '5px'}}
                                    onClick={this.sendDataEditForm}>Insert</Button>
                            <Button variant="outlined" color="primary" style={{marginLeft: '5px'}}
                                    onClick={this.modalToggleEdit}>Cancel</Button>
                        </div>
                    </div>
                </form>
            </Fragment>
        )
    }

    //isi form delete
    contentFormDelete() {
        return (
            <Fragment>
                <div style={{width: '100%', textAlign: 'center'}}>
                    <HighlightOffIcon style={{color: '#e23d28', fontSize: '100'}}/>
                </div>
                <div style={{margin: '20px', textAlign: 'center'}}>
                    <h4>Yakin?</h4>
                    <p style={{margin: '0', color: 'rgba(0,0,0,.5)'}}>Data ini akan hilang saat menekan tombol
                        "Delete"</p>
                    <p style={{margin: '5px', color: 'rgba(0,0,0,.5)'}}>Tekan "Cancel" untuk membatalkan</p>
                </div>
                <div align="center">
                    <Button style={{marginRight: '5px', background: '#e23d28', color: '#fff'}}
                            onClick={this.dataFormDelete}>Delete</Button>
                    <Button
                        style={{marginLeft: '5px', background: '#fff', border: '1px solid #e23d28', color: '#e23d28'}}
                        onClick={this.toggleDelete}>Cancel</Button>
                </div>
            </Fragment>
        )
    }

    //pindah table
    tabelTransaksi() {
        this.setState({
            tabelTransaksi: true,
            tabelKurir: false
        })
        const link = document.createElement("a")
        link.href = "/#/admin/transaksi"
        document.body.appendChild(link)
        link.click()
    }

    tabelKurir() {
        this.setState({
            tabelTransaksi: false,
            tabelKurir: true
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
                             title={"Kurir YFA Express"}/>
                <main>
                    <div style={{marginBottom: '70px'}}>

                        {/*button pilih tabel*/}
                        <div className="pilih">
                            <div className="pilih-tabel-transaksi" onClick={this.tabelTransaksi.bind(this)}>
                                <div
                                    className={`pilih-tabel-transaksi-desc ${this.state.tabelTransaksi ? 'font-biru' : ''}`}>
                                    <div className="title">
                                        Transaksi
                                    </div>
                                    <div className="deskripsi">
                                        Data drop off user
                                    </div>
                                    <div className={`garis ${this.state.tabelTransaksi ? 'bg-biru' : ''}`}></div>
                                </div>
                                <div className="pilih-tabel-transaksi-image-tabel"></div>
                            </div>
                            <div className="pilih-tabel-kurir" onClick={this.tabelKurir.bind(this)}>
                                <div className={`pilih-tabel-kurir-desc ${this.state.tabelKurir ? 'font-biru' : ''}`}>
                                    <div className="title">
                                        Kurir
                                    </div>
                                    <div className="deskripsi">
                                        Data kurir YFA
                                    </div>
                                    <div className={`garis ${this.state.tabelKurir ? 'bg-biru' : ''}`}></div>
                                </div>
                                <div className="pilih-tabel-kurir-image-tabel"></div>
                            </div>
                        </div>


                        <ModalKu headerColor={'#133671'}
                                 namaModalInsert={"Form Kurir"}
                                 namaModalEdit={"Edit Kurir"}
                                 formData={this.state.dataForm}
                                 isiFormInsert={this.contentForm()}
                                 isiFormEdit={this.contentFormEdit()}
                                 isiFormAlert={this.contentFormDelete()}
                                 modalInsert={this.state.modal}
                                 modalEdit={this.state.modalEdit}
                                 modalAlert={this.state.modalDelete}
                                 togglesInsert={this.toggle}
                                 togglesEdit={this.modalToggleEdit}
                                 togglesAlert={this.toggleDelete}
                        />
                        <Table title={"Data Kurir"}
                               color={"rgba(30, 171, 255, 1)"}
                               data={this.state.dataTable}
                               column={this.state.column}
                               search={true}
                               paging={true}
                               filter={false}
                               export={false}
                               actionAdd={this.toggle}
                               actionEdit={this.selectDataRow}
                               actionDelete={this.selectDataRow}
                        />
                    </div>
                </main>
                <Footer/>

            </Fragment>
        )
    }
}

export default TableData;