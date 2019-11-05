import React from 'react';
import Axios from 'axios';
import Chart from 'chart.js';

export class ChartSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            kpi: {},
            date: new Date()
        }

    }

    componentDidMount() {
        Axios.get('http://localhost:4000/get/kpi/' + this.props.sn)
            .then(res => {
                //console.log(res);
                this.setState({kpi: res.data})
            })
            .catch(err => {
                alert(err);
            })
            .finally(() => {
                console.log(this.state);
            });
        this.chartID = setInterval(
            () => this.chart(), 15000
        );
    }

    componentWillUnmount() {
        clearInterval(this.chartID);
    }

    chart() {
        const res = this.state.kpi.map((kpi) => {
            this.get_chart(kpi);
        })
    }

    get_chart(kpi) {
        Axios.get('http://localhost:4000/chart/data/' + this.props.sn +
            '/' + kpi.axis + '/' + kpi.key + '/recent/' + kpi.period)
            .then(res => {
                console.log(res);
                this.create_count_chart(kpi.kpi, res)
            })
            .catch(err => {
                alert(err);
            });
    }

    create_count_chart(index, data) {
        const canvas = this.refs.myChart;
        let ctx = canvas.getContext('2d');
        ctx.canvas.width = 490;
        ctx.canvas.height = 300;

        // let ctx2 = document.getElementById("myCountChart_second").getContext('2d');
        // ctx2.canvas.width = 600;
        // ctx2.canvas.height = 350;

        let cfg = this.count_cfg(ctx, data);

        window[index] = new Chart(ctx, cfg);
        // window.chart1 = new Chart(ctx2, cfg);
    }

    count_cfg(ctx, data) {
        let gradientStroke = ctx.createLinearGradient(0, 0, 0, 400);
        gradientStroke.addColorStop(0, "#439CFA");
        gradientStroke.addColorStop(1, "#439CFA");
        let gradientFill = ctx.createLinearGradient(0, 0, 0, 400);
        //gradientFill.addColorStop(0,"rgba(200,207,259,1)");
        gradientFill.addColorStop(0, "rgba(173,215,255,1)");
        gradientFill.addColorStop(1, "rgba(173,215,255,0.4");

        let dataset = {
            label: 'Count',
            data: data,
            fill: true,
            borderColor: gradientStroke,
            pointBorderColor: gradientStroke,
            pointBackgroundColor: gradientStroke,
            pointBorderWidth: 2,
            pointHoverRadius: 2,
            pointRadius: 2,
            backgroundColor: gradientFill,
            //hoverBackgroundColor:
            hoverBorderColor: "#FACD83",
            borderWidth: 2.5,
        };

        return {
            type: 'bar',
            data: {datasets: [dataset]},
            options: {
                legend: {
                    position: "bottom"
                },
                animation: true,
                responsive: false,
                maintainAspectRatio: false,
                responsiveAnimationDuration: 150,
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: false,
                    animationDuration: 0
                },
                scales: {
                    xAxes: [{
                        barThickness: 30,
                        type: 'time',
                        time: {
                            padding: 15,
                            fontStyle: "bold",
                            parser: 'MM-DD HH:mm:ss',
                            unit: 'minute',
                            unitStepSize: 30,
                            displayFormat: {
                                hour: 'MM-DD HH:mm'
                            }
                        },
                        ticks: {
                            autoSkip: true,
                            source: 'auto'
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            //display: true,
                            //labelString: 'Work Count'
                        },
                        ticks: {
                            fontColor: "rgba(0,0,0,0.8)",
                            fontStyle: "bold",
                            maxTicksLimit: 5,
                            padding: 15,
                            beginAtZero: true,
                            stepValue: 5,
                            steps: 10
                        }
                    }],
                    tooltips: {
                        intersect: false,
                        mode: 'index',
                        callbacks: {
                            label: function (tooltipItem, myData) {
                                var label = myData.datasets[tooltipItem.datasetIndex].label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += parseFloat(tooltipItem.value).toFixed(2);
                                return label;
                            }
                        }
                    }
                }
            }
        };
    }

    render() {
        return (
            <div className="robot_chart">
                <div className="chart_section">
                    <h3>WorK Count [CNT]</h3>
                    <div className="chart_cnt">
                        <canvas id="myCountChart" ref='myChart'/>
                    </div>
                </div>
                <div className="chart_section">
                    <h3>Temperature [TMP]</h3>
                    <div className="chart_tmp">
                        <canvas id="myTempChart"/>
                    </div>
                </div>
            </div>
        );
    }

}