import React, { useLayoutEffect, useState } from "react";
import {
    Alert,
    Button,
    Card,
    Container,
    Form,
    FormControl,
    FormGroup,
    InputGroup
} from "react-bootstrap";
import { FaLock, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/api";
import { authSelector } from "../../store/reducers/authSlice";
import "./login.css";
const Login = () => {
    const auth = useSelector(authSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initState = {
        username: "",
        password: "",
    };
    const [loginInfo, setLoginInfo] = useState(initState);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setLoginInfo((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(login(loginInfo));
    };

    useLayoutEffect(() => {
        if (auth.user) navigate("/home", { replace: true });
    }, [auth.user]);

    return (
        <Container id="login">
            <Card id="login-card">
                <Card.Header>CANNON FORT CAT BA HOTEL</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        {auth.errorMsg && (
                            <Alert variant="danger">Lỗi! {auth.errorMsg}</Alert>
                        )}
                        <FormGroup className="login-form">
                            <InputGroup>
                                <InputGroup.Text>
                                    <FaUserCircle />
                                </InputGroup.Text>
                                <FormControl
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={loginInfo.username}
                                    onChange={handleChange}
                                />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup className="login-form">
                            <InputGroup>
                                <InputGroup.Text>
                                    <FaLock />
                                </InputGroup.Text>
                                <FormControl
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={loginInfo.password}
                                    onChange={handleChange}
                                />
                            </InputGroup>
                        </FormGroup>
                        <Button variant="warning" type="submit">
                            Login
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Login;
