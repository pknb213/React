import React from 'react';

function RobotInfoView() {
    return (
        <div className="robot_info">
            <div className="robot_img">
                <img src="../static/img/img_productF.png" alt="robot_img"/>
                <div className="model_name">
                    <span>Indy7</span>
                    <button>
                        <img src="../static/img/icon_server_customer.svg" alt="icon_customer"/>
                        <span>고객사정보</span>
                    </button>
                </div>
                <div className="snnumber"/>
            </div>
        </div>
    );
}

export default RobotInfoView;