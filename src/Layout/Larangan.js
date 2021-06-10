import React, {Component, Fragment} from 'react';
import "../Style/larangan.css";
import larangan1 from "../img/larangan1.jpg";
import larangan2 from "../img/larangan2.jpg";
import larangan3 from "../img/larangan3.jpg";
import larangan4 from "../img/larangan4.jpg";
import larangan5 from "../img/larangan5.jpg";
import larangan6 from "../img/larangan6.jpg";
import larangan7 from "../img/larangan7.jpg";
import larangan8 from "../img/larangan8.jpg";
import larangan9 from "../img/larangan9.jpg";
import larangan10 from "../img/larangan10.jpg";

import {
    Container, Row
} from "reactstrap";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import JumbotronKu from "../Components/JumbotronKu";
import bg from "../img/1.jpg";


class Larangan extends Component {
    render() {
        return (
            <Fragment>
                <Header bgNav={"#133671"}/>
                <JumbotronKu image={bg}
                             jumboAfter={'linear-gradient(to right, rgba(30,171,255,1), rgba(30,171,255,0) 70%)'}
                             title={'Larangan'}/>
                <main>
                    <Container class="container">
                        <Row class="row">
                            <div class="bodynya row">
                                <div class="containersatu">
                                    <div class="box">
                                        <div class="imgBox">
                                            <img src={larangan9}/>
                                        </div>
                                        <div class="details">
                                            <div class="content">
                                                <h2>Organs</h2>
                                                <p>Variuos goods that can harm health,
                                                    like animal bones or other limbs,
                                                    animal organs, unproccesed animal skins,
                                                    and animal bones without or before safely
                                                    process</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="box">
                                        <div class="imgBox">
                                            <img src={larangan1}/>
                                        </div>
                                        <div class="details">
                                            <div class="content">
                                                <h2>Firearms</h2>
                                                <p>All kinds of ammunitions, firearms,
                                                    bullets, grenades, bombs, etc</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="box">
                                        <div class="imgBox">
                                            <img src={larangan2}/>
                                        </div>
                                        <div class="details">
                                            <div class="content">
                                                <h2>Chemical</h2>
                                                <p>All kinds of corrosive materials like
                                                    sulfuric acid, hydrochloric acid,
                                                    nitric acid, organic solvents, pesticide,
                                                    hydrogen peroxide, and other hazardous
                                                    chemicals</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="box">
                                        <div class="imgBox">
                                            <img src={larangan3}/>
                                        </div>
                                        <div class="details">
                                            <div class="content">
                                                <h2>Drugs</h2>
                                                <p>All kinds of narcotic drugs like, opium
                                                    (including flowers, sprout and opium
                                                    leaf), morn, cocaine, heroin, marijuana,
                                                    methamphetamine, ephedrine, and other
                                                    related products</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div class="containersatu">

                                    <div class="box">
                                        <div class="imgBox">
                                            <img src={larangan5}/>
                                        </div>
                                        <div class="details">
                                            <div class="content">
                                                <h2>Prohibited by Law</h2>
                                                <p>Goods that are prohibited to be
                                                    circulated according to laws and
                                                    regulation of country like, document,
                                                    state secret information, currency,
                                                    counterfeit money, all kinds of
                                                    securities paper, replica weapons,
                                                    sharp weapon, art goods, rare animals
                                                    and finished product</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="box">
                                        <div class="imgBox">
                                            <img src={larangan6}/>
                                        </div>
                                        <div class="details">
                                            <div class="content">
                                                <h2>Radioactive</h2>
                                                <p>Various types of radioactive elements
                                                    and its depository like uranium,
                                                    cobalt, radium and plutonium</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="box">
                                        <div class="imgBox">
                                            <img src={larangan7}/>
                                        </div>
                                        <div class="details">
                                            <div class="content">
                                                <h2>Flammable</h2>
                                                <p>All kinds of flammable material, including
                                                    liquid, gas and solid chemistry. Like gasoline,
                                                    kerosene, alcohol, varnish, diesel fuel,
                                                    aerosol/ spray tube, lighters, gas holder,
                                                    phosphorus, sulfur, matches, etc</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="box">
                                        <div class="imgBox">
                                            <img src={larangan8}/>
                                        </div>
                                        <div class="details">
                                            <div class="content">
                                                <h2>Explosive Materials</h2>
                                                <p>Easily explosive materials like explosive
                                                    materials & detonator, gunpowder, firecrackers, etc</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Row>
                    </Container>
                </main>
                <Footer/>
            </Fragment>

        );
    }
}

export default Larangan;