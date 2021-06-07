import React, {Fragment} from 'react'
import Header from "../Components/Header";
import Jumbo from "../Components/Jumbo";
import Footer from "../Components/Footer";
import axios from "axios";

import {
    Button, Label, Input
} from 'reactstrap';
import bg from "../img/2.jpg";
import {Table} from "../Components/Table";
import ModalKu from "../Components/ModalKu";
import {TextField} from "@material-ui/core";


class TableData extends React.Component {
    constructor() {
        super();
        let dataForm = {
            idKurir: "",
            namaKurir: "",
            noTelpKurir: "",
            file: ""
        }
        this.state = {
            modal: false,
            modalEdit: false,
            dataTable: [],
            column: [],
            dataForm: dataForm
        }
        this.toggle = this.toggle.bind(this)
        this.modalToggleEdit = this.modalToggleEdit.bind(this)
        this.selectDataRow = this.selectDataRow.bind(this)
        this.sendDataFormInsert = this.sendDataFormInsert.bind(this)
        this.sendDataEditForm = this.sendDataEditForm.bind(this)

    }

    //action edit data pada tabel
    selectDataRow(data, modal) {
        this.state.dataForm = data
        if (modal === "Edit") {
            this.modalToggleEdit()
        } else {
            // this.modalToggleDelete()
            console.log("Hapus")
        }
    }

    toggle(sesuatu) {
        this.setState({
            modal: !this.state.modal
        });
    }

    modalToggleEdit(e) {
        this.setState({modalEdit: !this.state.modalEdit})
    }

    async getDataKurir() {
        const res = await axios.get("http://localhost:3333/api/kurir", {
            headers: {'Content-Type': 'application/json'}
        })
        let img = [];
        for (let i = 0; i < res.data.length; i++) {
            const dataImage = await axios.get("http://localhost:3333/api/kurir/getImage/" + res.data[i].idKurir, {
                headers: {'Content-Type': 'application/json'}
            })
            img.push(dataImage.data)
        }
        console.log(img)
        const data = res.data
        const dataTable = data.map((content, index) => ({
            idKurir: content.idKurir,
            image: <img src={"data:image/*;base64," + img[index]} alt="foto kurir"
                        style={{width: "100px", borderRadius: "5px"}}/>,
            namaKurir: content.namaKurir,
            noTelpKurir: content.noTelpKurir
        }))
        return dataTable
    }


    componentDidMount() {
        axios.get("http://localhost:3333/api/kurir")
            .then(res => {
                this.setState({dataTable: res.data})
                console.log(res)
            })
        this.getDataKurir()

        this.getDataKurir().then(res => {
            this.setState({dataTable: res})
            this.setState({
                column: [
                    // {title: 'id', field: 'id'},
                    {title: 'Id Kurir', field: 'idKurir'},
                    {title: 'Nama Kurir', field: 'namaKurir'},
                    {title: 'No Telp Kurir', field: 'noTelpKurir'},
                    {title: 'File', field: 'image'}
                ]
            })
        })
    }

    //post mapping tambah data
    sendDataFormInsert(e) {
        this.toggle(e)
    }

    //post mapping edit data
    sendDataEditForm(e) {
        this.modalToggleEdit(e)
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
                        <TextField style={{width: '100%'}} onChange={this.handleChange} label="No.Telp Kurir"
                                   name="noTelpKurir"/>
                        <Label>Upload Picture : </Label>
                        <Input type="file" name="file" id="file"/>

                        <div align="right">
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
                                   name="namaKurir"/>
                        <TextField style={{width: '100%'}} onChange={this.handleChange} label="No.Telp Kurir"
                                   name="noTelpKurir"/>
                        <Label>Upload Picture : </Label>
                        <Input type="file" name="file" id="file"/>

                        <div align="right">
                            <Button variant="contained" color="primary" style={{marginRight: '5px'}}
                                    onClick={this.sendDataFormEdit}>Edit</Button>
                            <Button variant="outlined" color="primary" style={{marginLeft: '5px'}}
                                    onClick={this.modalToggleEdit}>Cancel</Button>
                        </div>
                    </div>
                </form>
            </Fragment>
        )
    }


    render() {
        return (
            <Fragment>
                <Header bgNav={"#1EABFF"}/>
                <Jumbo image={bg}
                       jumboAfter={'linear-gradient(to right, rgba(19,54,113,1), rgba(19,54,113,0) 70%)'}
                       title={"Kurir YFA Express"}/>
                <main>
                    <ModalKu headerColor={'#133671'}
                             namaModalInsert={"Form Kurir"}
                             namaModalEdit={"Edit Kurir"}
                             formData={this.state.dataForm}
                             isiFormInsert={this.contentForm()}
                             isiFormEdit={this.contentFormEdit()}
                             modalInsert={this.state.modal}
                             modalEdit={this.state.modalEdit}
                             togglesInsert={this.toggle}
                             togglesEdit={this.modalToggleEdit}
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
                    />
                </main>
                <Footer/>

            </Fragment>
        )
    }
}

export default TableData;