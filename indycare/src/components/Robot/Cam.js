import React from 'react';
import iconCam from "../../resources/Robot/icon-dashcam.svg";
import iconTime from "../../resources/Robot/icon-time.svg";

const CamView = () => {
    return (
        <div className="event_view">
                    <div className="section_title">
                        <img src={iconCam} alt="icon_dashcam"/>
                        <div id="clip_msg"/>
                        <h3>Workplace View</h3>
                    </div>
                    <div className="time">
                        <img src={iconTime} alt="icon_time"/>
                    </div>
                    <video id="clip" width="350" height="280" controls loop muted autoPlay/>
                </div>
    );
};

export default CamView;