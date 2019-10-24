import React from "react";
import DataTable from 'react-data-table-component';
import './DataTable.css'

const data = [{id: 1, title: 'Happy', year: '1992'}, {id: 2, title:'fucking', year: '1994'}];

const columns = [
    {
        name: 'Title',
        selector: 'title',
        sortable: true,
    }  ,
    {
        name: 'Year',
        selector: 'year',
        sortable: true,
        right: true,
    },
];

class DataTableComponent extends React.Component {
    constructor(props) {
        super(props);


    }

    render() {
        return (
            <div className="list_contents_table">
                <table id="dataTable" className="table_style">
                    <thead>
                    <tr>
                        <th>SN</th>
                        <th>Model</th>
                        <th>Site</th>
                        <th>Company</th>
                        <th>KPI</th>
                        <th>Header</th>
                        <th>State</th>
                        <th> Enter</th>
                    </tr>
                    </thead>
                </table>
                <div>
                </div>
            <DataTable
                title="NRmK"
                columns={columns}
                data={data}
            />
            </div>
        );
    }
}

export default DataTableComponent;