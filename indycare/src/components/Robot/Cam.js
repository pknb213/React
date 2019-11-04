import React from 'react';
import iconCam from "../../resources/Robot/icon-dashcam.svg";
import iconTime from "../../resources/Robot/icon-time.svg";
import loadingImg from "../../resources/Robot/video_loading.jpg";
import {ImgOnly} from "../Public/Image";
import Axios from "axios";

class CamView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            tick : new Date(),
            clipTick : new Date()
        };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(), 1000
        );
       this.videoID = setInterval(
           () => this.clip(), 5000
       );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
        clearInterval(this.videoID);
    }

    clip(){
         Axios.get('http://localhost:4000/clip/' + this.props.sn)
            .then(res => {
                console.log(res);
                const video = document.getElementById('clip');
                video.style.display = 'block';
                video.setAttribute('poster', {loadingImg});
                video.setAttribute('src',
                    'http://localhost:4000/get/clip/' + this.props.sn);
                this.setState({
                    clipTick : new Date().valueOf()
                })
            })
            .catch(err => {
                alert(err);
            })
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
                    <ImgOnly src={iconCam} alt="icon_dashcam"/>
                    <div id="clip_msg"/>
                    <h3>&nbsp;&nbsp;Workplace View</h3>
                </div>
                <div className="time">
                    <img src={iconTime} alt="icon_time"/>
                    <h3>&nbsp;&nbsp;{this.state.tick.toLocaleTimeString()}&nbsp;&nbsp;&nbsp;</h3>
                </div>
                <video id="clip" width="350" height="280" controls loop muted autoPlay/>
            </div>
        );
    }
}

export default CamView;