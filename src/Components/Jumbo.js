import React from 'react'
import {Jumbotron, Container, Display4} from "bootstrap-4-react";
import glamorous from "glamorous";
import '../Style/Jumbotron.css'

const Jumbo = (props) => {
    const Jumbo = glamorous.div({
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
            }
    })

    return (
        <Jumbo className="jumbotron jumbotron-fluid" fluid>
            <Container className="container">
                <h1><Display4>{props.title}</Display4></h1>
                <p>This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
            </Container>
        </Jumbo>
    )
}

export default Jumbo;