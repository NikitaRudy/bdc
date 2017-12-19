import React from 'react';
import propTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

function TableHeader(props) {
    const { headerContent, secondaryHeaderContent } = props;
    return (
        <div>
            <h4>{ headerContent }</h4>
            <h6>{ secondaryHeaderContent }</h6>
            <div className="navigation">
                <NavLink tag={ Link } to="/" >Rankings</NavLink>
                <NavLink tag={ Link } to="/progress" >Progress</NavLink>
            </div>
        </div>
    );
}

TableHeader.propTypes = {
    headerContent: propTypes.string,
    secondaryHeaderContent: propTypes.string,
};

export default TableHeader;
