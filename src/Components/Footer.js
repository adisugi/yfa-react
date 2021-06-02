import React from 'react';
import '../Style/Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fab)


const Footer = () => {
    return (
        <div className="footer-container">
            <div className="skew-box">
                <div className="logo">

                </div>
                <div className="alamat-kantor">
                    <p className="kantor">Kantor Pusat</p>
                    <p>Jl. l. Kerinci XII No.7</p>
                    <p>Kota Jakarta Selatan</p>
                    <p className="enter">Daerah Khusus Ibukota Jakarta 12120</p>
                    <p>Contact center. (62-21) 2927 8888</p>
                    <p>Office. (62-21) 566 5262</p>
                    <p>Fax. (62-21) 567 1413</p>
                    <p>Email. yfaexpress@yfa.co.id</p>
                </div>
                <div className="list-layanan">
                    <p className="kantor">Produk & Layanan</p>
                    <p>Express</p>
                    <p>Reguler</p>
                </div>
                <div className="app">
                    <div className="img-app1"></div>
                    <div className="img-app2"></div>
                    <div className="img-app3"></div>
                </div>
                <div className="hold-us">
                    <i><FontAwesomeIcon icon={['fab', 'youtube']} /></i>
                    <i><FontAwesomeIcon icon={['fab', 'twitter']} /></i>
                    <i><FontAwesomeIcon icon={['fab', 'facebook-square']} /></i>
                    <i><FontAwesomeIcon icon={['fab', 'instagram']} /></i>
                </div>

            </div>
            <div className="box-child">
                <p>Kebijakan Privasi dan Keamanan</p>
                <p>Copyright © 2021 YFA Express. All Rights Reserved.</p>
            </div>
        </div>

    );
};

export default Footer;