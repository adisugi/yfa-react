import React, {Fragment} from 'react'
import MaterialTable from "material-table";
import {Container} from "bootstrap-4-react";


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
                        },
                        rowData => ({
                            icon: 'delete',
                            tooltip: 'Delete Data',
                            // eslint-disable-next-line no-restricted-globals
                            onClick: (event, rowData) => confirm("You want to delete " + rowData.id),
                        })
                    ]}/>
            </Container>
        </Fragment>
    )
}