import React from 'react';

export class ChartSection extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
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
        );
    }

}