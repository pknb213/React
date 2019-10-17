import React from 'react';
import logo from './logo.svg';
import './img_card.css'

function ImgCard() {
    return (
        <div className="row">
            <ImgDiv />
            <ImgDiv />
            <ImgDiv />
        </div>
    );
}

function ImgDiv() {
    return (
        <div className="imgDiv">
            <Img />
        </div>
    );
}

function Img() {
    return (
        <a href="./#">
          <img className="img" src={logo} alt="Hi"/>
        </a>
    );
}

export default ImgCard;

