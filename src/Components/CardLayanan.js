import React, {Fragment} from 'react'
import {Card, Container} from 'bootstrap-4-react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStopwatch, faDolly} from "@fortawesome/free-solid-svg-icons";
import bgCard from '../img/3.jpg'
import '../Style/LayananCard.scss'

const CardLayanan = () => {

    return (
        <Card className="Card" style={{ width: '18rem', margin: '10px' }}>
            <Card.Image className="Card-img" src={bgCard} />
            <div className="Card-jenis-layanan">
                <div className="Card-jenis-layanan-nama">
                    <p>Ok</p>
                </div>
            </div>
            <Card.Body className="Card-body-layanan">
                <div className="Card-body-layanan-description">
                    <div className="Card-body-layanan-description-icon">
                        <FontAwesomeIcon icon={faStopwatch}/>
                    </div>
                    <p>Estimasi waktu pengiriman : 2-3 hari</p>
                </div>
                <div className="Card-body-layanan-description">
                    <div className="Card-body-layanan-description-icon">
                        <FontAwesomeIcon icon={faDolly}/>
                    </div>
                    <p>Seluruh Indonesia</p>
                </div>
            </Card.Body>
        </Card>

        // <Card className="card card-service" style={{width: "18rem"}}>
        //     <Card.Image className="card-img-top" src="img/3.jpg" alt="Card image cap"/>
        //     <div className="image-row">
        //         <div className="image-col text-center">
        //             <p>oK</p>
        //         </div>
        //     </div>
        //     <Card.Body className="card-body justify-content-center">
        //         <div className="card-body-content" style={{paddingTop: "10px", paddingLeftt: "15px"}}>
        //             <div style={{marginBottom: "-10px"}}>
        //                 <i className="fa fa-stopwatch"></i>
        //                 <p>Estimasi waktu pengiriman : 2-3 hari</p>
        //             </div>
        //             <div>
        //                 <i className="fa fa-dolly"></i>
        //                 <p>Seluruh Indonesia</p>
        //             </div>
        //         </div>
        //     </Card.Body>
        // </Card>
    )
}

export default CardLayanan