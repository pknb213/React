import React from 'react';
import Axios from "axios";
import busyIcon from '../../resources/Robot/active/icon_busy.svg';
import readyIcon from '../../resources/Robot/active/icon_ready.svg';
import collisionIcon from '../../resources/Robot/active/icon_collision.svg';
import errorIcon from '../../resources/Robot/active/icon_error.svg';
import statePlayIcon from '../../resources/Robot/active/icon_state_play.svg';
import statePauseIcon from '../../resources/Robot/active/icon_state_pause.svg';
import emergencyIcon from '../../resources/Robot/active/icon_energency.svg';
import reporterConnectIcon from '../../resources/Robot/active/icon_report_connected.svg';
import serverConnectIcon from '../../resources/Robot/active/icon_server_connected.svg';
import unbusyIcon from '../../resources/Robot/inactive/icon_busy.svg';
import unreadyIcon from '../../resources/Robot/inactive/icon_ready.svg';
import uncollisionIcon from '../../resources/Robot/inactive/icon_collision.svg';
import unerrorIcon from '../../resources/Robot/inactive/icon_error.svg';
import unstateStopIcon from '../../resources/Robot/inactive/icon_state_stop.svg';
import unemergencyIcon from '../../resources/Robot/inactive/icon_energency.svg';
import reporterNotConnectIcon from '../../resources/Robot/inactive/icon_report_connected.svg';
import serverNotConnectIcon from '../../resources/Robot/inactive/icon_server_connected.svg';
import {Img, ImgOnly} from "../Public/Image";

function StateDiv(props) {
    //console.log(props.state.data);
    let state = props.state.data;
    if (state === undefined)
        state = {};

    let rows = [];

    console.log(state);
    // 0 ~ 9
    for (let key in state) {
        let imgElement;
        console.log(key, state[key]);
        if (state.hasOwnProperty(key)) {
            if (state[key] > 0) {
                if (key === 'busy')
                    imgElement = <ImgOnly src={busyIcon} text={'BUSY'}/>;
                else if (key === 'ready')
                    imgElement = <ImgOnly src={readyIcon} text={'READY'}/>;
                else if (key === 'collision')
                    imgElement = <ImgOnly src={collisionIcon} text={'COLLISION'}/>;
                else if (key === 'error')
                    imgElement = <ImgOnly src={errorIcon} text={'ERROR'}/>;
                else if (state[key] === 2)
                    imgElement = <ImgOnly src={statePauseIcon} text={'PROGRAM STATE'}/>;
                else if (key === 'programState')
                    imgElement = <ImgOnly src={statePlayIcon} text={'PROGRAM STATE'}/>;
                else if (key === 'emergency')
                    imgElement = <ImgOnly src={emergencyIcon} text={'EMERGENCY'}/>;
                else if (key === 'is_reporter_connected')
                    imgElement = <ImgOnly src={reporterConnectIcon} text={'ROBOT CONNECTED'}/>;
                else if (key === 'is_server_connected')
                    imgElement = <ImgOnly src={serverConnectIcon} text={'SERVER CONNECTED'}/>;

                rows.push(<li id={key + '_li'} key={key}>{imgElement}</li>);
            } else {
                if (key === 'busy')
                    imgElement = <ImgOnly src={unbusyIcon} text={'BUSY'}/>;
                else if (key === 'ready')
                    imgElement = <ImgOnly src={unreadyIcon} text={'READY'}/>;
                else if (key === 'collision')
                    imgElement = <ImgOnly src={uncollisionIcon} text={'COLLISION'}/>;
                else if (key === 'error')
                    imgElement = <ImgOnly src={unerrorIcon} text={'ERROR'}/>;
                else if (key === 'programState')
                    imgElement = <ImgOnly src={unstateStopIcon} text={'PROGRAM STATE'}/>;
                else if (key === 'emergency')
                    imgElement = <ImgOnly src={unemergencyIcon} text={'EMERGENCY'}/>;
                else if (key === 'is_reporter_connected')
                    imgElement = <ImgOnly src={reporterNotConnectIcon} text={'ROBOT CONNECTED'}/>;
                else if (key === 'is_server_connected')
                    imgElement = <ImgOnly src={serverNotConnectIcon} text={'SERVER CONNECTED'}/>;

                rows.push(<li id={key + '_li'} key={key}>{imgElement}</li>);
            }
        } else
            alert("Error입니다");
    }

    return (
        <div className="robot_state_noti">
            <ul id="stateUI">
                {rows}
            </ul>
        </div>
    );
}

class StateView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            robotState: {
                'busy': 0, 'collision': 0, 'emergency': 0, 'error': 0, 'home': 0,
                'finish': 0, 'ready': 0, 'resetting': 0, 'zero': 0, 'is_server_connected': 0
            }
        }
    }

    componentDidMount() {
        this.stateID = setInterval(
            () => this.tick(), 1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.stateID)
    }

    tick() {
        Axios.post('http://localhost:4000/robot/state/' + this.props.sn)
            .then(res => {
                    //console.log(res);
                    this.setState({robotState: res});
                }
            )
            .catch(err => {
                    alert(err);
                }
            )
    }

    render() {
        return (
            <div className="robot_state">
                <div className="robot_state_info">
                    <h3>Robot State</h3>
                    <StateDiv state={this.state.robotState}/>
                </div>
            </div>
        );
    }
}

export default StateView;

