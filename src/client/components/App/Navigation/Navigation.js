import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Navbar,
    Nav,
    NavbarBrand,
    UncontrolledDropdown,
    DropdownMenu,
    DropdownToggle,
    DropdownItem,
    NavItem,
    NavLink,
} from 'reactstrap';

import background from './bdc_background.jpg';

const Navigation = () => {
    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">BDC Leaderboards</NavbarBrand>
                <Nav className="ml-auto" navbar>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Rankings
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem tag={Link} to="/rankings/core">
                                Core
                            </DropdownItem>
                            <DropdownItem tag={Link} to="/rankings/support">
                                Support
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Progress
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem tag={Link} to="/progress/core">
                                Core
                            </DropdownItem>
                            <DropdownItem tag={Link} to="/progress/support">
                                Support
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            </Navbar>
            <img className="bdc-logo" src={`/${background}`} />
        </div>
    );
};

export default Navigation;
