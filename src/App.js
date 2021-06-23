import './App.css';
import DropOff from "./Layout/DropOff";
import Lacak from './Layout/Lacak'
import Layanan from "./Layout/Layanan";
import AboutUs from "./Layout/AboutUs";
import TableData from "./Layout/Kurir";

import MenuAdmin from "./Layout/MenuAdmin";
import React, {Fragment} from 'react'
import {Route, Redirect} from 'react-router-dom'
import Larangan from "./Layout/Larangan";
import Home from "./Layout/Home";
import Panduan from "./Layout/Panduan";
import Register from "./Layout/Register";
import Login from "./Layout/Login";

function App() {
  return (
    <Fragment>
        <Route path="/home" component={Home}/>
        <Route path="/dropoff" component={DropOff}/>
        <Route path="/lacak" component={Lacak}/>
        <Route path="/layanan" component={Layanan}/>
        <Route path="/about-us" component={AboutUs}/>
        <Route path="/admin/transaksi" component={MenuAdmin}/>
        <Route path="/kurir" component={TableData}/>
        {/*<Route path="/user/transaksi" component={MenuUser}/>*/}
        <Route path="/informasi/larangan" component={Larangan}/>
        <Route path="/informasi/panduan" component={Panduan}/>
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>
        <Route exact path="/" render={() => (
            <Redirect to="/home" />
        )} />
    </Fragment>
  );
}

export default App;
