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
import DetailArea from '../components/Aera/DetailArea';
import ManageArea from '../components/Aera/ManageArea';
import Manage from '../components/SurveillanceDomain/Manage';
import ManageEdit from '../components/SurveillanceDomain/ManageEdit';
import Dashboard from './Dashboard';
import Incident from './Incident';
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
//Payload
import ListPayload from './Payload/PayloadManagement/List';
import ListTypePayload from './Payload/PayloadType/List';
import PayloadMaintenance from './Payload/PayloadMaintenance/List';
import EditSchedule from './Payload/PayloadMaintenance/Edit';
import AddSchedule from './Payload/PayloadMaintenance/Add';
import PayloadSetting from './Payload/PayloadSetting';
//Payload  Statistic
import PayloadStatistic from './Payload/PayloadStatistic';
import PayloadStatisticFrequency from './Payload/PayloadStatistic/PayloadStatisticFrequency';
import PayloadStatisticTime from './Payload/PayloadStatistic/PayloadStatisticTime';
import PayloadStatisticStatus from './Payload/PayloadStatistic/PayloadStatisticStatus';
import PayloadStatisticWorking from './Payload/PayloadStatistic/PayloadStatisticWorking';
import PayloadStatisticDroneFixing from './Payload/PayloadStatistic/PayloadStatisticDroneFixing';
import PayloadDroneHistory from './Payload/PayloadToDrone/List';
import EditSignupPayloadDrone from './Payload/PayloadToDrone/Edit';
import AddSignupPayloadDrone from './Payload/PayloadToDrone/Add';
import DScard from './Payload/PayloadSDcard';
import ImageVideo from './ImageVideo';
import Detail from './ImageVideo/detail';
import Stream from './ImageVideo/stream';
// incident group 09
import IncidentGroup9 from "./Incident/Incident";
import ImageGallery from "./Incident/ImageGallery";
import VideoGallery from "./Incident/VideoGallery";
import IncidentEdit from "./Incident/Incident/edit";

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
  //PAYLOAD
  {
    path: '/payloads',
    component: () => <div>PayloadManagement</div>,
  },
  {
    path: '/payload-management',
    component: ListPayload,
  },
  {
    path: '/payload-dscard',
    component: DScard,
  },
  {
    path: '/payload-type',
    component: ListTypePayload,
  },

  {
    path: '/payload-drone',
    component: PayloadDroneHistory,
  },
  {
    path: '/edit-signup-payload-drone',
    component: EditSignupPayloadDrone,
  },
  {
    path: '/add-signup-payload-drone',
    component: AddSignupPayloadDrone,
  },
  {
    path: '/payload-configuration',
    component: PayloadSetting,
  },
  /* {
    path: '/payload-maintenance',
    component: PayloadMaintenance,
  }, */
  /* {
    path: '/edit-schedule',
    component: EditSchedule,
  },
  {
    path: '/add-schedule',
    component: AddSchedule,
  },
 */
  //Payload statistic
  {
    path: '/payload-statistic',
    component: PayloadStatistic,
  },
  {
    path: '/payload-statistic-type',
    component: PayloadStatisticFrequency,
  },
  {
    path: '/payload-statistic-time',
    component: PayloadStatisticTime,
  },
  {
    path: '/payload-statistic-work',
    component: PayloadStatisticWorking,
  },
  {
    path: '/payload-statistic-status',
    component: PayloadStatisticStatus,
  },
  {
    path: '/payload-statistic-fix',
    component: PayloadStatisticDroneFixing,
  },

  {
    path: '/metadata',
    component: () => <ImageVideo />,
  },
  {
    path: '/stream',
    component: () => <Stream />,
  },
  {
    path: '/image-video-detail/:id',
    component: () => <Detail />,
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
    path: '/surveillance-domain-area',
    component: () => <div>Quản lý khu vực</div>,
  },
  {
    path: '/surveillance-domain-manage/edit',
    component: () => <ManageEdit />,
    exact: true,
  },
  {
    path: '/surveillance-domain-manage',
    component: () => <Manage />,
    exact: true,
  },
  {
    path: '/surveillance-area',
    component: () => <ManageArea />,
  },
  {
    path: '/surveillance-area-detail',
    component: () => <DetailArea />,
  },
  {
    path: '/handle-problem',
    component: Incident,
    exact: true,
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
  {
    path: "/incidents",
    component: () => <IncidentGroup9 />,
    exact: true
  },
  
  {
    path: "/incidents/:id",
    component: () => <IncidentEdit />,
    exact: true

  },
  {
    path: "/imageGallery",
    component: () => <ImageGallery />,
    exact: true
  },
  {
    path: "/videoGallery",
    component: () => <VideoGallery />,
    exact: true
  },
];

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLogin = useSelector((state) => state.user.isLogin);

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /sign in page
    <Route
      {...rest}
      render={(props) =>
        isLogin ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default () => (
  <Switch>
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
  </Switch>
);
