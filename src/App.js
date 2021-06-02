import './App.css';
import DropOff from "./Layout/DropOff";
import Lacak from './Layout/Lacak'
import Layanan from "./Layout/Layanan";
import AboutUs from "./Layout/AboutUs";

import MenuAdmin from "./Layout/MenuAdmin";
import React, {Fragment} from 'react'
import {Route} from 'react-router-dom'

function App() {
  return (
    <Fragment>
        <Route path="/dropoff" component={DropOff}/>
        <Route path="/lacak" component={Lacak}/>
        <Route path="/layanan" component={Layanan}/>
        <Route path="/about-us" component={AboutUs}/>
    </Fragment>
  );
}

export default App;
