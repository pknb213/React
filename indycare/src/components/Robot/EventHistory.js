import React from 'react';
import iconHistory from "../../resources/Robot/icon-history.svg";
import iconMore from "../../resources/Robot/icon-more.svg";
import {EventDataTable} from "./EventDataTable";
import Axios from "axios";
import $ from "jquery";

export class EventHistoryView extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="event_history">
                <div className="section_title">
                    <img src={iconHistory} alt="icon_event_history"/>
                    <h3>Event History</h3>
                    <div className="more">
                        <button id="history_Btn">
                            <span>더보기</span>
                            <img src={iconMore} alt="icon_more"/>
                        </button>
                        <div id="history_Modal" className="more_modal">
                            <div className="modal-content">
                                <span className="close">&times;</span>
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
                            </div>
                        </div>
                    </div>
                </div>
                <EventDataTable sn={this.props.sn}/>
            </div>
        );
    }
}