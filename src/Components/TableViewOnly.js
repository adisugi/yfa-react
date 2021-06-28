import React, {Fragment} from 'react'
import MaterialTable from "material-table";
import { Container } from "bootstrap-4-react";
import '../Style/Tabel.css'


export const TableViewOnly = (props) => {
    return(
        <Fragment>
            <Container style={{position: 'relative'}}>
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
                    />
            </Container>
        </Fragment>
    )
}