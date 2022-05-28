import React from "react";
import {
    Container,
    Nav,
    Navbar,
    NavbarBrand,
    NavDropdown,
    OffcanvasBody,
    OffcanvasHeader,
    OffcanvasTitle
} from "react-bootstrap";
import NavbarOffcanvas from "react-bootstrap/esm/NavbarOffcanvas";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import { FaHotel, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api/api";
import { authSelector } from "../../store/reducers/authSlice";
import Sidebar from "../Sidebar";
import "./Header.css";
const Header = ({ children }) => {
    const auth = useSelector(authSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await dispatch(logout());
            navigate("/login", { replace: true });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <Navbar expand={false} id="header">
                <Container fluid className="justify-content-start">
                    <Container fluid>
                        <NavbarToggle aria-controls="offcanvas" />
                        <NavbarBrand>
                            <FaHotel /> <span>HMS</span>
                        </NavbarBrand>
                        <NavbarOffcanvas
                            id={"offcanvas"}
                            aria-labelledby={"offcanvas-label"}
                            placement="start"
                            scroll={true}
                            backdrop={true}
                        >
                            <OffcanvasHeader>
                                <OffcanvasTitle id={"offcanvas-label"}>
                                    Offcanvas
                                </OffcanvasTitle>
                            </OffcanvasHeader>
                            <OffcanvasBody>
                                <Sidebar />
                            </OffcanvasBody>
                        </NavbarOffcanvas>

                        <Nav id="avatar" align="end">
                            <NavDropdown title={<FaUserCircle />}>
                                <NavDropdown.Item>
                                    User: {auth.user.username}
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={handleLogout}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Container>
                </Container>
            </Navbar>
            {children}
        </div>
    );
};

export default Header;
