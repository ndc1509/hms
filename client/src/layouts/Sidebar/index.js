import React from "react";
import { Nav, NavDropdown, NavLink } from "react-bootstrap";
const Sidebar = () => {
    return (
        <Nav className="justify-content-end flex-grow-1 pe-3">
            <NavLink>Home</NavLink>
            <NavLink>Link</NavLink>
            <NavDropdown title="Dropdown">
                <NavDropdown.Item>Action</NavDropdown.Item>
            </NavDropdown>
        </Nav>
    );
};

export default Sidebar;
