import React from 'react';
import Axios from 'axios';
import $ from 'jquery';
import DataTable from 'datatables.net-dt';

$.DataTable = DataTable;

export class EventDataTable extends React.Component {
    constructor(props) {
        super(props);
        // this.myRef = React.createRef();
    }

    componentDidMount(nextProps, nextState) {
        Axios.get('http://localhost:4000/datatable/events/' + this.props.sn)
            .then(res => {
                console.log(res);
                this.table = $(this.refs.main).DataTable({
                    data: res.data,
                    process: true,
                    searching: false,
                    paging: false,
                    lengthChange: false,
                    bInfo: false,
                    scrollXInner: '550px',
                    scrollX: '530px',
                    scrollY: false,
                    order: [[0, 'desc']],
                    columns: [
                        {"data": "occurrence_time"},
                        {"data": "code"},
                        {"data": "down"}
                    ],
                    language: {
                        "emptyTable": "저장된 이벤트 데이터가 없습니다."
                    }
                })
            }).catch(e => {
            alert(e);
        }).finally(() => {

        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.table.clear();
        this.table.rows.add(this.transform(this.props.data));
        this.table.draw();
    }

    componentWillUnmount() {
        $('.event_history')
            .find('dataTable')
            .DataTable()
            .destroy(true);
    }

    render() {
        return (
            // <dev ref={this.myRef}/>
            <div>
                <table id="dataTable" className="" ref='main'>
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