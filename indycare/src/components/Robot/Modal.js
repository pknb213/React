import React from 'react';
import Axios from 'axios';
import $ from 'jquery';
import DataTable from 'datatables.net-dt';
import DownIcon from '../../resources/Robot/icon-download.svg';

$.DataTable = DataTable;

export class Modal extends React.Component {
    constructor(props) {
        super(props);
        // this.myRef = React.createRef();
    }

    componentDidMount(nextProps, nextState) {
        Axios.get('http://localhost:4000/datatable/events/' + this.props.sn + '/all')
            .then(res => {
                console.log(res);
                this.table = $(this.refs.main).DataTable({
                    data: res.data,
                    process: true,
                    searching: false,
                    paging: false,
                    bInfo: false,
                    order: [[0, 'asc']],
                    columns: [
                        {"data": "occurrence_time"},
                        {"data": "code"},
                        {"data": "down"}
                    ],
                    language: {
                        "emptyTable": "저장된 이벤트 데이터가 없습니다."
                    }
                });
                this.table.rows().every((index) => {
                    let a = this.table.cell(index, 2).data();
                    this.table.cell(index, 2).data(a + '<img alt="" src=' + DownIcon + '></a>');
                });
            }).catch(e => {
            alert(e);
        }).finally(() => {

        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.table.clear();
        //this.table.rows.add(this.transform(this.props.data));
        this.table.draw();
    }

    componentWillUnmount() {
        $('.event_history')
            .find('dataTable_history')
            .DataTable()
            .destroy(true);
    }

    render() {
        return (
            <div className="history_table">
                <h2>All Event History</h2>
                <table id="dataTable_history" className="" ref="main">
                    <thead>
                    <tr>
                        <th>DATE</th>
                        <th>EVENT</th>
                        <th>LOG</th>
                    </tr>
                    </thead>
                </table>
            </div>
        )
    }
}

/*
<React.Fragment>
    {
        isOpen ?
            <React.Fragment>
                <div className="history_table">
                    <h2>All Event History</h2>
                    <table id="dataTable_history" className="">
                        <thead>
                        <tr>
                            <th>DATE</th>
                            <th>EVENT</th>
                            <th>LOG</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </React.Fragment>
            :
            null
    }
</React.Fragment>
*/