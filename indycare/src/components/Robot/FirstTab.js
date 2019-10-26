import React from 'react';
import './FirstTab.css'
import StateView from "./State";
import RobotInfoView from "./RobotInfoView";

class FirstTab extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div id="Robot_Information" className="tabcontent tab_contents">
                <RobotInfoView/>

                <StateView/>

                <div className="event_section">
                    <div className="event_view">
                        <div className="section_title">
                            <img src="../static/img/icon-dashcam.svg" alt="icon_dashcam"/>
                            <div id="clip_msg"></div>
                            <h3>Workplace View</h3>
                        </div>
                        <div className="time">
                            <img src="../static/img/icon-time.svg" alt="icon_time"/>
                        </div>
                        <video id="clip" width="350" height="280" controls loop muted autoplay/>
                    </div>

                    <div className="event_history">
                        <div className="section_title">
                            <img src="../static/img/icon-history.svg" alt="icon_event_history"/>
                            <h3>Event History</h3>
                            <div className="more">
                                <button id="history_Btn">
                                    <span>더보기</span>
                                    <img src="../static/img/icon_more.svg" alt="icon_more"/>
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
                            <script type="text/javascript">
                            </script>
                        </div>
                    </div>
                </div>
                <div className="robot_chart">
                    <div className="chart_section">
                        <h3>WorK Count [CNT]</h3>
                        <div className="chart_cnt">
                            <canvas id="myCountChart"/>
                        </div>
                    </div>

                    <diV className="chart_section">
                        <h3>Temperature [TMP]</h3>
                        <div className="chart_tmp">
                            <canvas id="myTempChart"/>
                        </div>
                    </diV>
                </div>
            </div>
        );
    }
}

export default FirstTab;
