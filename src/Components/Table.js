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
                            backgroundColor: '#01579b',
                            color: '#FFF'
                        },
                        search: props.search,
                        paging: props.paging,
                        filtering: props.filter,
                        exportButton: props.export
                    }}/>
            </Container>
        </Fragment>
    )
}