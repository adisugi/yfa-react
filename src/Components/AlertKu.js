import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFrown} from "@fortawesome/free-solid-svg-icons";

import '../Style/AlertKu.scss'

const AlertKu = () => {
    return (
        <div class="row-alert">
            <div class="row-alert-content">
                <span class="row-alert-content-emot">
                    <FontAwesomeIcon className="fa-frown" icon={faFrown}/>
                    {/*<i class="fa fa-frown"></i>*/}
                </span>
                <span class="row-alert-content-massage">Resi tidak ditemukan</span>
            </div>
        </div>
    )
}

export default AlertKu

