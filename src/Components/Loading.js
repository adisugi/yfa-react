import React, {Fragment} from 'react'
import '../Style/Loading.scss'


const Loading = (props) => {
    return (
        <Fragment>
            <div className="row-loading" style={{display: props.display}}>
                <div className="loading">
                    <div className="circle"></div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <p>Tunggu sebentar</p>
                        <span> ...</span>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Loading