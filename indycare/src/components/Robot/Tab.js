import React from 'react';
import './Tab.css'

class Tab extends React.Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="tab_menu">
                <button className="tablinks" onClick="openMenu(event, 'Robot_Information')" id="defaultOpen">
                    Robot Information
                </button>
                <button className="tablinks" onClick="openMenu(event, 'Chart_Information')">
                    Chart Information
                </button>
            </div>
        );
    }
}

export default Tab;