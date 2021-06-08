import React, {Fragment} from 'react'
import MaterialTable from "material-table";
import {Container} from "bootstrap-4-react";
import '../Style/Tabel.css'
import {Button} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton"
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip'


export const Table = (props) => {
    return(
        <Fragment>
            <Container style={{position: 'relative'}}>
                <Tooltip title="Add Data">
                    <IconButton style={{position: 'absolute', zIndex: '1', left: '180px', top: '7px', outline: 'none'}}
                                onClick={props.actionAdd} >
                        <AddIcon/>
                    </IconButton>
                </Tooltip>

                {/*<Button onClick={props.actionAdd}>Tambah</Button>*/}
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
                            iconProps: {className: "edit"},
                            onClick: (event, rowData) => {
                                props.actionEdit(rowData, "Edit")
                                // alert("You saved " + rowData.id)
                            }
                        },
                        {
                            icon: 'delete',
                            tooltip: 'Delete Data',
                            iconProps: {className: "delete"},
                            // eslint-disable-next-line no-restricted-globals
                            onClick: (event, rowData) => {if(window.confirm('Are you sure to delete this record?')){ props.actionDelete(rowData)}},
                        }
                    ]}/>
            </Container>
        </Fragment>
    )
}