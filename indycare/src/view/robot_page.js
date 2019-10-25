import React from 'react';

const DetailView = ({match}) => {
    return (
        <div>
            <h2>{match.params.sn} Detail</h2>
        </div>
    );
};

export default DetailView;