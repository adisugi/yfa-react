import React, {Component, Fragment} from 'react';
import Header from "../Components/Header";
import Jumbo from "../Components/Jumbo";
import Footer from "../Components/Footer";
import {Table} from "../Components/Table"
import bg from "../img/2.jpg"


const data = [
    {nama: 'Adi', umur: 20},
    {nama: 'Adi', umur: 20},
    {nama: 'Adi', umur: 20}
]

const column = [
    {title: 'Name', field: 'nama'},
    {title: 'Age', field: 'umur'}
]

class MenuAdmin extends Component {
    render() {
        return (
            <Fragment>
                <Header bgNav={"#1EABFF"}/>
                <Jumbo image={bg}
                       jumboAfter={'linear-gradient(to right, rgba(19,54,113,1), rgba(19,54,113,0) 70%)'}
                       title={"Menu Admin"}/>
                <main>
                    <Table title={"Data Adi"}
                           data={data}
                           column={column}
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