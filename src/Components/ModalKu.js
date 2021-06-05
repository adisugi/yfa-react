import React, { useState, useEffect } from 'react';
import {Modal, TextField, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Zoom from '@material-ui/core/Zoom';

export const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '25%',
        left: '33%',
        transform: 'translate(-50%, -50%)'
    },
    iconos:{
        cursor: 'pointer'
    }
}));

function ModalKu(props) {
    const styles= useStyles();

    const modalBody=(
        <div className={styles.modal}>
            {props.isiForm}
            <div align="right">
                <Button color="primary" onClick={props.saveData}>Insertar</Button>
                <Button onClick={props.toggles}>Cancelar</Button>
            </div>
        </div>
    )

    return (
        <div>
            <Modal
                open={props.modalInsert}
                onClose={props.toggles}
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}>
                <Zoom in={props.modalInsert}>
                    {modalBody}
                </Zoom>
            </Modal>
        </div>

    )

}

export default ModalKu