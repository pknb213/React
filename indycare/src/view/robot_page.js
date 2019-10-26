import React from 'react';
import TopMenu from "../components/Public/TopMenu";
import HeaderTitle from "../components/Public/HeaderTitle";
import SideNavigator from "../components/Public/SideNavigator";
import FirstTab from "../components/Robot/FirstTab";
import SecondTab from "../components/Robot/SecondTab";
import Tab from "../components/Robot/Tab";

const DetailView = ({match}) => {
    return (
        <div id="wrapper">
            <h2>{match.params.sn}</h2>
            <SideNavigator/>
            <div className="contents_wrap clear">
                <div className="header_wrap">
                    <div className="header_top">
                        <TopMenu/>
                        <HeaderTitle title="Robot Detail" breadcrumb="Robot Detail"/>
                    </div>
                    <Tab/>
                    <div className="tab_contents_wrap">
                        <FirstTab/>
                        <SecondTab/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailView;