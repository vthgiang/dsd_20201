import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import ListUser from "../modules/user/components/listUser";
import ListDepartment from "../modules/user/components/listDepartment";

import Dashboard from "./Dashboard";

export const routes = [
    {
        path: "/dashboard",
        component: Dashboard,
        exact: true,
    },
    {
        path: "/drones",
        component: () => <div>DroneManagement</div>,
    },
    {
        path: "/drone-state",
        component: () => <div>Tình trạng drone</div>,
    },
    {
        path: "/fly-setting",
        component: () => <div>Thiết lập đường bay</div>,
    },
    {
        path: "/drone-statistic",
        component: () => <div>Thống kê drone</div>,
    },
    {
        path: "/flight-hub",
        component: () => <div>Flight Hub</div>,
    },
    {
        path: "/payloads",
        component: () => <div>PayloadManagement</div>,
    },
    {
        path: "/metadata",
        component: () => <div>Meta Data</div>,
    },
    {
        path: "/problem",
        component: () => <div>Problem</div>,
    },
    {
        path: "/supervised-object",
        component: () => <div>Đối tượng giám sát</div>,
    },
    {
        path: "/statistic",
        component: () => <div>Báo cáo thống kê</div>,
    },
    {
        path: "/problems",
        component: () => <div>Sự cố</div>,
    },
    {
        path: "/warning",
        component: () => <div>Cảnh báo</div>,
    },
    {
        path: "/activity-log",
        component: () => <div>Lịch sử hoạt động</div>,
    },
    {
        path: "/surveillance-domain",
        component: () => <div>Miền giám sát</div>,
    },
    {
        path: "/handle-problem",
        component: () => <div>Xử lý sự cố</div>,
    },
    {
        path: "/user-management",
        component: ListUser,
    },
    {
        path: "/user",
        component: ListUser,
    },
    {
        path: "/department",
        component: ListDepartment,
    },
];

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isLogin = useSelector((state) => state.user.isLogin);

    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route
            {...rest}
            render={(props) =>
                isLogin ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    );
};

export default () => (
    <Fragment>
        {routes.map(
            ({ path, exact = false, component: Component, ...rest }) => {
                return (
                    <PrivateRoute
                        key={path}
                        exact={exact}
                        path={path}
                        component={Component}
                        {...rest}
                    />
                );
            }
        )}
    </Fragment>
);
