import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavLink,
} from 'reactstrap';

class Navigation extends Component {
    render() {
        return (
            <div>
                <Navbar>
                    <NavbarBrand tag={ Link } to="/">
                        BDC Leaderboards
                    </NavbarBrand>
                    <Nav className="ml-auto">
                        <NavLink tag={ Link } to="/rankings">Rankings</NavLink>
                        <NavLink tag={ Link } to="/progress">Progress</NavLink>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}

Navigation.propTypes = {};

export default Navigation;
