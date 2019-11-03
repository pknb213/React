import React from 'react';
import iconCam from "../../resources/Robot/icon-dashcam.svg";
import iconTime from "../../resources/Robot/icon-time.svg";

class CamView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            tick : new Date()
        };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(), 1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick(){
        this.setState({
            tick : new Date()
        });
    }

    render() {
        return (
           <div className="event_view">
                <div className="section_title">
                    <img src={iconCam} alt="icon_dashcam"/>
                    <div id="clip_msg"/>
                    <h3>Workplace View</h3>
                </div>
                <div className="time">
                    <img src={iconTime} alt="icon_time"/>
                    <h3>{this.state.tick.toLocaleTimeString()}</h3>
                </div>
                <video id="clip" width="350" height="280" controls loop muted autoPlay/>
            </div>
        );
    }
}

export default CamView;