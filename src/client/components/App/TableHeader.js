import React from 'react';
import propTypes from 'prop-types';

function TableHeader(props) {
    const { headerContent, secondaryHeaderContent } = props;
    return (
        <div>
            <h5>{ headerContent }</h5>
            <h6>{ secondaryHeaderContent }</h6>
        </div>
    );
}

TableHeader.propTypes = {
    headerContent: propTypes.string,
    secondaryHeaderContent: propTypes.string,
};

export default TableHeader;
