import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Dashboard from './Dashboard';
import StatisticDashboard from './Statistic/Dashboard';
import StatisticDrone from './Statistic/Drone';
import StatisticPayload from './Statistic/Payload';
import StatisticProblem from './Statistic/Problem';
import StatisticUser from './Statistic/User';
import CreateReport from './Report/CreateReport';
import ViewReport from './Report/ViewReport';
import ManageReportTemplate from './Report/ManageReportTemplate';

export const routes = [
    {
        path: '/dashboard',
        component: Dashboard,
        exact: true,
    },
    {
        path: '/drones',
        component: () => <div>DroneManagement</div>,
    },
    {
        path: '/drone-state',
        component: () => <div>Tình trạng drone</div>,
    },
    {
        path: '/fly-setting',
        component: () => <div>Thiết lập đường bay</div>,
    },
    {
        path: '/drone-statistic',
        component: StatisticDrone,
    },
    {
        path: '/flight-hub',
        component: () => <div>Flight Hub</div>,
    },
    {
        path: '/payloads',
        component: () => <div>PayloadManagement</div>,
    },
    {
        path: '/metadata',
        component: () => <div>Meta Data</div>,
    },
    {
        path: '/problem',
        component: () => <div>Problem</div>,
    },
    {
        path: '/supervised-object',
        component: () => <div>Đối tượng giám sát</div>,
    },
    {
        path: '/statistic',
        component: () => <div>Thống kê</div>,
    },
    {
        path: '/dashboard-statistic',
        component: StatisticDashboard,
    },
    {
        path: '/drone-statistic',
        component: StatisticDrone,
    },
    {
        path: '/payload-statistic',
        component: StatisticPayload,
    },
    {
        path: '/trouble-statistic',
        component: StatisticProblem,
    },
    {
        path: '/user-statistic',
        component: StatisticUser,
    },
    {
        path: '/report',
        component: () => <div>Thống kê</div>,
    },
    {
        path: '/create-report',
        component: CreateReport,
    },
    {
        path: '/view-report',
        component: ViewReport,
    },
    {
        path: '/manage-report-template',
        component: ManageReportTemplate,
    },
    {
        path: '/problems',
        component: () => <div>Sự cố</div>,
    },
    {
        path: '/warning',
        component: () => <div>Cảnh báo</div>,
    },
    {
        path: '/activity-log',
        component: () => <div>Lịch sử hoạt động</div>,
    },
    {
        path: '/surveillance-domain',
        component: () => <div>Miền giám sát</div>,
    },
    {
        path: '/handle-problem',
        component: () => <div>Xử lý sự cố</div>,
    },
    {
        path: '/user-management',
        component: () => <div>Quản lý người dùng</div>,
    },
];

export default () => (
    <Switch>
        {routes.map(({ path, exact = false, component: Component, ...rest }) => {
            return (
                <Route
                    key={path}
                    exact={exact}
                    path={path}
                    component={Component}
                    {...rest}
                />
            );
        })}
        <Redirect to='/' />
    </Switch>
);
