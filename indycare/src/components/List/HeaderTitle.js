import React from 'react';
import './HeaderTitle.css'

class HeaderTitle extends React.Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="header_title">
                <h1>ROBOT LIST</h1>
                <div className="breadcrumb">
                    <ul>
                        <li><a href="/">HOME</a></li>
                        <li className="on"><a href="/">ROBOT LIST</a></li>
                    </ul>
                </div>
            </div>
        );
    }

}

export default HeaderTitle;