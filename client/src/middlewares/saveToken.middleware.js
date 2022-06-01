import jwt_decode from "jwt-decode";

const saveTokenMiddleware = (store) => (next) => (action) => {
    let accessToken, decoded, user
    switch (action.type) {
        case "login/fulfilled":
            accessToken = action.payload.accessToken;
            decoded = jwt_decode(accessToken);
            user = { id: decoded.userId, username: decoded.username };
            localStorage.setItem("ACCESS_TOKEN", accessToken);
            localStorage.setItem("USER", JSON.stringify(user));
            break;
        case "logout/fulfilled":
            localStorage.clear();
            break;
        case "reauthorize/fulfilled":
            accessToken = action.payload.accessToken;
            decoded = jwt_decode(accessToken);
            user = { id: decoded.userId, username: decoded.username };
            localStorage.setItem("ACCESS_TOKEN", accessToken);
            localStorage.setItem("USER", JSON.stringify(user));
            break;
        case "reauthorize/rejected":
            localStorage.clear()
            break;
        default:
            break;
    }
    return next(action);
};

export default saveTokenMiddleware;
