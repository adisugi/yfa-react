import React, { useState, useEffect } from 'react';
import {Modal, TextField, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Zoom from '@material-ui/core/Zoom';
import '../Style/Modal.scss'

export const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalBody: {
        position: 'relative',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        borderRadius: '5px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        overflowY: 'scroll',
        height: '500px',
        '&::-webkit-scrollbar' : {
            display: 'none'
        }
    },
    iconos:{
        cursor: 'pointer'
    }
}));

function ModalKu(props) {
    const styles= useStyles();

    const modalBodyInsert=(
        <div className={styles.modalBody}>
            {props.isiFormInsert}
            <div align="right">
                <Button color="primary" onClick={props.saveDataInsert}>Insertar</Button>
                <Button onClick={props.togglesInsert}>Cancelar</Button>
            </div>
        </div>
    )

    const modalBodyEdit=(
        <div className={styles.modalBody}>
            {props.isiFormEdit}
            <div align="right">
                <Button color="primary" onClick={props.saveDataEdit}>Editar</Button>
                <Button onClick={props.togglesEdit}>Cancelar</Button>
            </div>
        </div>
    )

    return (
        <div>
            <Modal
                className={styles.modal}
                open={props.modalInsert}
                onClose={props.togglesInsert}
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                disableScrollLock={true}>
                <Zoom in={props.modalInsert}>
                    {modalBodyInsert}
                </Zoom>
            </Modal>
            <Modal
                className={styles.modal}
                open={props.modalEdit}
                onClose={props.togglesEdit}
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                disableScrollLock={true}>
                <Zoom in={props.modalEdit}>
                    {modalBodyEdit}
                </Zoom>
            </Modal>
        </div>

    )

}

export default ModalKu