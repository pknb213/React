import React from 'react';

function StateView() {
    return (
        <div className="robot_state">
            <div className="robot_state_info">
                <h3>Robot State</h3>
                <div className="robot_state_noti">
                    <ul>
                        <li id="busy_li"/>
                        <li id="ready_li"/>
                        <li id="collision_li"/>
                        <li id="error_li"/>
                        <li id="program_state_li"/>
                        <li id="emergency_li"/>
                        <li id="report_connected_li"/>
                        <li id="server_connected_li"/>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default StateView;