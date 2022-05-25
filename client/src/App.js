import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomeRoute from "./routes/HomeRoute";
import LoginRoute from "./routes/LoginRoute";
function App() {
    return (
        <Routes>
            <Route path="/" element={<LoginRoute/>}/>
            <Route path="/home" element={<HomeRoute/>}/>
        </Routes>
    );
}

export default App;
