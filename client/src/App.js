import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import useReauthorize from "./hooks/useReauthorize";
import Error403 from "./pages/Error/Error403";
import Error404 from "./pages/Error/Error404";
import PrivatePage from "./pages/Private";
import { privateRoutes, publicRoutes } from "./routes";
import { authSelector } from "./store/reducers/authSlice";

function App() {
    const auth = useSelector(authSelector);
    const isReauthorized = auth.reauthorized;
    useReauthorize();
    if (isReauthorized)
        return (
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component;
                    let Layout = Fragment;
                    if (route.layout) {
                        Layout = route.layout;
                    }

                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
                {privateRoutes.map((route, index) => {
                    const Page = route.component;
                    let Layout = Fragment;
                    if (route.layout) {
                        Layout = route.layout;
                    }
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <PrivatePage>
                                    <Layout>
                                        <Page />
                                    </Layout>
                                </PrivatePage>
                            }
                        />
                    );
                })}
                <Route path="/403" element={<Error403 />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
        );
}

export default App;
