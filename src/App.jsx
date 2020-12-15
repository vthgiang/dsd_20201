import React, { Fragment, useEffect } from "react";
import {
    BrowserRouter,
    Switch,
    Route,
    useHistory,
    Redirect,
} from "react-router-dom";
import MainLayout from "./containers/MainLayout";
import Home from "./pages/Home";
import AppRouter from "./pages/routes";
import { Provider, useSelector } from "react-redux";
import store, { persistor } from "../src/services";
import { PersistGate } from "redux-persist/lib/integration/react";

import Login from "../src/modules/user/components/login";
import ForgotPassword from "../src/modules/user/components/forgotPassword";
import Register from "../src/modules/user/components/register";
import ChangePassword from "../src/modules/user/components/changePassword";
import { setHeaders } from "./services/axios";

const App = () => {
    useEffect(() => {
        if (localStorage.getItem("project-type")) {
            setHeaders({
                "project-type": localStorage.getItem("project-type"),
            });
        }
        if (localStorage.getItem("token")) {
            setHeaders({ token: localStorage.getItem("token") });
        }
    }, []);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <AppModule />
            </PersistGate>
        </Provider>
    );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isLogin = useSelector((state) => state.user.isLogin);

    return (
        <Route
            {...rest}
            render={(props) =>
                isLogin ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    );
};

const AppModule = () => {
    return (
        <BrowserRouter>
            <Switch>
                <PrivateRoute exact path="/home" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route
                    exact
                    path="/forgot-password"
                    component={ForgotPassword}
                />
                <Route
                    exact
                    path="/change-password"
                    component={ChangePassword}
                />
                <MainLayout>
                    <AppRouter />
                </MainLayout>
            </Switch>
        </BrowserRouter>
    );
};

export default App;
