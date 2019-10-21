import React from 'react';

function Img(props) {
    return (
        <a href={props.href}>
          <img className={props.id} src={props.src} alt={props.alt} srcSet={props.srcset} />
        </a>
    );
}

export {Img};