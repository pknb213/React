import React from 'react';
import Axios from 'axios';
import Chart from 'chart.js';
import LineGraph from "../Public/LineGraph";
import BarGraph from "../Public/BarGraph";

export class ChartSection extends React.Component {
    myChart = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            kpi: {},
            active: 0,
            labels: {},
            kpi0: {},
            kpi1: {},
            kpi2: {},
            kpi3: {},
            kpi4: {},
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:4000/get/kpi/' + this.props.sn)
            .then(res => {
                //console.log(res);
                this.setState({kpi: res.data});
                this.chart(); // Before Loop
            })
            .catch(err => {
                alert(err);
            })
            .finally(() => {
                console.log(this.state);
            });
        this.chartID = setInterval(
            () => this.chart(), 3000
        );
    }

    componentWillUnmount() {
        clearInterval(this.chartID);
    }

    chart() {
        // kpi.label === '' or kpi.key === 'none'일 땐, 생성 x
        let i = 0;
        const res = this.state.kpi.map((kpi) => {
            if (kpi.key !== 'none') {
                // console.log(kpi);
                this.get_data(kpi);
                i++;
            }
            else{
                this.setState({[kpi.kpi]: ''})
            }
        });
        this.setState({active: i});
        //console.log(this.state);
    }

    get_data(kpi) {
        Axios.get('http://localhost:4000/chart/data/' + this.props.sn +
            '/' + kpi.axis + '/' + kpi.key + '/recent/' + kpi.period)
            .then(res => {
                //console.log(res.data);
                this.setState({[kpi.kpi] : res.data});
            })
            .catch(err => {
                alert(err);
            });
    }

    render() {
        return (
            <div className="robot_chart">
                <BarGraph data={this.state.kpi0}/>
                <LineGraph data={[this.state.kpi0,this.state.kpi1,this.state.kpi2,this.state.kpi3]}/>
            </div>
        );
    }
}