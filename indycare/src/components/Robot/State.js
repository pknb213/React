import React from 'react';
import Axios from "axios";
import busyIcon from '../../resources/Robot/active/icon_busy.svg'
import unbusyIcon from '../../resources/Robot/inactive/icon_busy.svg'
import {PText} from "../Public/Text";
import {Img} from "../Public/Image";

function StateDiv(props) {
    //console.log(props.state.data);
    let state = props.state.data;
    if (state === undefined)
        state = {};

    let rows = []

    console.log(state);
    // 0 ~ 9
    for (let key in state){
        console.log(key, state[key]);
        if (state[key])
            rows.push(<Img/>);
        // 이런식응로 하자
        else if(!state[key])
            rows.push("<img src={unbusyIcon} alt='icon_busy' /><span>BUSY</span>");
        else
            alert("Error입니다");

    }

    return (
        <div className="robot_state_noti">
            <ul id="stateUI">
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
    );
}

class StateView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { robotState : {
            'busy': 0, 'collision': 0, 'emergency': 0, 'error': 0, 'home': 0,
            'finish': 0, 'ready': 0, 'resetting': 0, 'zero': 0, 'is_server_connected': 0}
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
                    <StateDiv state={this.state.robotState} />
                </div>
            </div>
        );
    }
}

export default StateView;

