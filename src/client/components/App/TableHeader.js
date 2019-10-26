import React from 'react';
import propTypes from 'prop-types';

const TableHeader = ({ headerContent, secondaryHeaderContent }) => (
    <div className="table-header">
        <h5>{headerContent}</h5>
        <h6>{secondaryHeaderContent}</h6>
    </div>
);

TableHeader.propTypes = {
    headerContent: propTypes.string,
    secondaryHeaderContent: propTypes.string,
};

export default TableHeader;
