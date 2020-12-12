import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import ListUser from '../modules/user/components/listUser';
import ListDepartment from '../modules/user/components/listDepartment';
import ListUserMeta from '../modules/user/components/listUserMeta';

import ListMonitorCampaignPage from './FlightHub/ListMonitorCampaign';
import CreateMonitorCampaignPage from './FlightHub/CreateMonitorCampaign';
import UpdateMonitorCampaignPage from './FlightHub/UpdateMonitorCampaign';

import ListLabelsPage from './FlightHub/Labels';
import Dashboard from './Dashboard';
import MyList from '../components/Group4/Notification';
import DetailedNotification from '../components/Group4/DetailedNotification';

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
    path: '/flight-hub-monitor-campaigns/create',
    component: CreateMonitorCampaignPage,
  },
  {
    path: '/flight-hub-monitor-campaigns/:id',
    component: UpdateMonitorCampaignPage,
  },
  {
    path: '/flight-hub-monitor-campaigns',
    component: ListMonitorCampaignPage,
  },
  {
    path: '/flight-hub-other-params',
    component: ListLabelsPage,
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
    component: () => <MyList />,
  },
  {
    path: '/warning-detail/:id',
    component: () => <DetailedNotification />,
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
    component: ListUser,
  },
  {
    path: '/user',
    component: ListUser,
  },
  {
    path: '/department',
    component: ListDepartment,
  },
  {
    path: '/user-meta',
    component: ListUserMeta,
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
    {routes.map(({ path, exact = false, component: Component, ...rest }) => {
      return (
        <PrivateRoute
          key={path}
          exact={exact}
          path={path}
          component={Component}
          {...rest}
        />
      );
    })}
  </Fragment>
);
