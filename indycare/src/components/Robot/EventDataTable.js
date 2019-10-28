import React from 'react';
import Axios from 'axios';
import $ from 'jquery';
import DataTable from 'datatables.net-dt';

$.DataTable = DataTable;

export class EventDataTable extends React.Component {
    constructor(props) {
        super(props);
        console.log("EventDataTable :");
        console.log(props);
    }

    componentDidMount() {
        Axios.get('http://localhost:4000/datatable/events/' + this.props.sn)
            .then(res => {
                console.log(res);
            }).catch(e => {
                alert(e);
        }).finally(() => {

        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div>
                <table id="dataTable" className="">
                    <thead>
                    <tr>
                        <th>DATE</th>
                        <th>EVENT</th>
                        <th>LOG</th>
                    </tr>
                    </thead>
                </table>
            </div>
        );
    }
}