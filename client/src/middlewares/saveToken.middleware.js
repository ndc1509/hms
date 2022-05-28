import jwt_decode from "jwt-decode";

const saveTokenMiddleware = (store) => (next) => (action) => {
    switch (action.type) {
        case "login/fulfilled":
            const accessToken = action.payload.accessToken;
            const decoded = jwt_decode(accessToken);
            const user = { id: decoded.userId, username: decoded.username };
            localStorage.setItem("ACCESS_TOKEN", accessToken);
            localStorage.setItem("USER", JSON.stringify(user));
            break;
        case "logout/fulfilled":
            localStorage.clear();
            break;
        default:
            break;
    }
    return next(action);
};

export default saveTokenMiddleware;
