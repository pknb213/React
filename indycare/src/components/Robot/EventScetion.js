import React from 'react';
import iconCam from '../../resources/Robot/icon-dashcam.svg';
import iconTime from '../../resources/Robot/icon-time.svg';
import iconHistory from '../../resources/Robot/icon-history.svg';
import iconMore from '../../resources/Robot/icon-more.svg';
import CamView from "./Cam";
import {EventHistoryView} from "./EventHistory";

export class EventScetion extends React.Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="event_section">
                <CamView sn={this.props.sn}/>
                <EventHistoryView sn={this.props.sn}/>
            </div>
        );
    }

}