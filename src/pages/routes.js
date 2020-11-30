import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Dashboard from './Dashboard';
import LogUser from './LogUser';
import LogDrone from './LogDrone';
import LogWarn from './LogWarn';
import LogProblem from './LogProblem';
import LogVideo from './LogVideo';
import LogPayLoad from './LogPayLoad';
import LogImage from './LogImage';
import LogIncident from './LogIncident';
import LogObjMonitor from './LogObjMonitor';
import LogRegion from './LogRegion';
import LogStatistic from './LogStatistic';
import LogUAV from './LogUAV';
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
    component: () => <div>Thống kê drone</div>,
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
    component: () => <div>Báo cáo thống kê</div>,
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
    path: '/log-user',
    component: LogUser,
  },
  {
    path: '/log-drone',
    component: LogDrone,
  },
  {
    path: '/log-problem',
    component: LogProblem,
  },
  {
    path: '/log-warn',
    component: LogWarn,
  },
  {
    path: '/log-payload',
    component: LogPayLoad,
  },
  {
    path: '/log-image',
    component: LogImage,
  },
  {
    path: '/log-video',
    component: LogVideo,
  },
  {
    path: '/log-incident',
    component: LogIncident,
  },
  {
    path: '/log-objmonitor',
    component: LogObjMonitor,
  },
  {
    path: '/log-region',
    component: LogRegion,
  },
  {
    path: '/log-statistic',
    component: LogStatistic,
  },
  {
    path: '/log-uav',
    component: LogUAV,
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
