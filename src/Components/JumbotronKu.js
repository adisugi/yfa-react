import React from 'react'
import {Jumbotron, Container, Display4} from "bootstrap-4-react";
import {makeStyles} from "@material-ui/core";
import '../Style/Jumbotron.css'

const JumbotronKu = (props) => {
    const useStyle = makeStyles((theme) => ({
        jumbo : {
            background : `url(${props.image})`,
            backgroundSize: 'cover',
            display: 'flex',
            alignItems: 'center',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
            zIndex: '-1',
            marginTop: '50px',
            '&::before' : {
                content : `""`,
                display: 'block',
                height: '100%',
                width: '100%',
                backgroundImage: props.jumboAfter,
                position: 'absolute',
                top: '0'
            },
            [theme.breakpoints.up(992)]: {
                marginTop: '0',
                minHeight: '400px'
            },
            [theme.breakpoints.up(384)] : {
                backgroundPositionY: '-20px',
                backgroundPositionX: '0'
            },
            [theme.breakpoints.down(300)] : {
                backgroundPositionX: '-50px'
            }
        }
    }))

    const styles = useStyle()

    return (
        <Jumbotron className={`${styles.jumbo} jumbotron jumbotron-fluid`} fluid>
            <Container className="container">
                <h1><Display4>{props.title}</Display4></h1>
                <p>This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
            </Container>
        </Jumbotron>
    )
}

export default JumbotronKu