import React from "react";
import {
    Container,
    Dropdown,
    Nav,
    Navbar,
    NavbarBrand,
    NavItem,
    NavLink,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaHotel, FaUserCircle } from "react-icons/fa";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
const Sidebar = () => {
    return (
        <Navbar
            bg="dark"
            variant="dark"
            className="d-block flex-column p-3"
            style={{ minWidth: "100px" }}
        >
            <NavbarBrand className=" ">
                <Link to="/">
                    <FaHotel />
                </Link>
            </NavbarBrand>
            <Nav className="d-block">
                <NavItem className="my-2">
                    <Link className="text-decoration-none" to="/">
                        {" "}
                        Sơ đồ
                    </Link>
                </NavItem>
                <NavItem className="my-2">
                    <Link className="text-decoration-none" to="/schedule">
                        {" "}
                        Lịch
                    </Link>
                </NavItem>
                <NavItem className="my-2">
                    <Link className="text-decoration-none" to="/">
                        {" "}
                        Thống kê
                    </Link>
                </NavItem>
            </Nav>
            <Dropdown drop="up" className="">
                <DropdownToggle className="d-flex justify-content-center align-items-center"><FaUserCircle className="me-1"/>{"Admin"}</DropdownToggle>
                <DropdownMenu>
                    <DropdownItem>Thay đổi mật khẩu</DropdownItem>
                    <DropdownItem>Đăng xuất</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </Navbar>
    );
};

export default Sidebar;
