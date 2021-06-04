import React, {Fragment} from 'react'
import MaterialTable from "material-table";
import {Container} from "bootstrap-4-react";
import {IconButton} from "@material-ui/core";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit} from "@fortawesome/free-solid-svg-icons";


export const editTable = (props) => {
    return (
        <IconButton component="span">
            <FontAwesomeIcon icon={faEdit}/>
        </IconButton>
    )
}

export const Table = (props) => {
    return(
        <Fragment>
            <Container>
                <MaterialTable
                    title={props.title}
                    data={props.data}
                    columns={props.column}
                    options={{
                        headerStyle: {
                            backgroundColor: props.color,
                            color: '#FFF',
                        },
                        search: props.search,
                        paging: props.paging,
                        filtering: props.filter,
                        exportButton: props.export,
                        actionsColumnIndex: -1
                    }}
                    actions={[
                        {
                            icon: 'edit',
                            tooltip: 'Edit Data',
                            onClick: (event, rowData) => {
                                alert("You saved " + rowData.id)
                            }
                        }
                    ]}/>
            </Container>
        </Fragment>
    )
}