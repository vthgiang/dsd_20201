import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import DetailArea from "../components/Aera/DetailArea";
import ManageArea from "../components/Aera/ManageArea";
import DetailedNotification from "../components/Group4/DetailedNotification";
import MyList from "../components/Group4/Notification";
import Manage from "../components/SurveillanceDomain/Manage";
import ManageEdit from "../components/SurveillanceDomain/ManageEdit";
import ListDepartment from "../modules/user/components/listDepartment";
import ListPermission from "../modules/user/components/listPermission";
import ListRole from "../modules/user/components/listRole";
import ListRolePermission from "../modules/user/components/listRolePermission";
import ListUser from "../modules/user/components/listUser";
import ListUserMeta from "../modules/user/components/listUserMeta";
import Dashboard from "./Dashboard";
import StatisticDeDieu from './Dashboard/IncidentDashboard';
import CreateMonitorCampaignPage from "./FlightHub/CreateMonitorCampaign";
import DetailMonitorCampaignPage from './FlightHub/DetailMonitorCampaign';
import ListLabelsPage from "./FlightHub/Labels";
import ListMonitorCampaignPage from "./FlightHub/ListMonitorCampaign";
import UpdateMonitorCampaignPage from "./FlightHub/UpdateMonitorCampaign";
import FlightPath from './FlightPath';
import FlightPoint from './FlightPoint';
//DE DIEU
import HomeDeDieu from "./Home/DeDieu";
import DeDieuNcn3 from "./Home/DeDieu/indexncn3";
import Task1 from './Home/DeDieu/Task1/index';
import Task5 from './Home/DeDieu/Task5/index';
import ImageVideo from "./ImageVideo";
import Detail from "./ImageVideo/detail";
import Stream from "./ImageVideo/stream";
import Incident from "./Incident";
import ImageGallery from './Incident/ImageGallery';
// incident group 09
import IncidentGroup9 from './Incident/Incident';
import IncidentEdit from './Incident/Incident/edit';
import VideoGallery from './Incident/VideoGallery';
import LogDrone from "./LogDrone";
import LogImage from "./LogImage";
import LogIncident from "./LogIncident";
import LogObjMonitor from "./LogObjMonitor";
import LogPayLoad from "./LogPayLoad";
import LogProblem from "./LogProblem";
import LogRegion from "./LogRegion";
import LogStatistic from "./LogStatistic";
import LogDashboardPage from "./LogTreeProject";
import LogUAV from "./LogUAV";
import LogUser from "./LogUser";
import LogVideo from "./LogVideo";
import LogWarn from "./LogWarn";
import MapTest from './MapTest';
//monitored Object Group 05
import CategoryMonitored from "./MonitoredObject/Category/component";
import MonitoredObject from "./MonitoredObject/MonitoredObject/component";
import MonitoredObjectCreate from "./MonitoredObject/MonitoredObject/component/monitoredObjectCreate";
import MonitoredObjectView from "./MonitoredObject/MonitoredObject/component/MonitoredObjectView";
//Payload
import ListPayload from "./Payload/PayloadManagement/List";
import DScard from "./Payload/PayloadSDcard";
import PayloadSetting from "./Payload/PayloadSetting";
//Payload  Statistic
import PayloadStatistic from "./Payload/PayloadStatistic";
import PayloadStatisticDroneFixing from "./Payload/PayloadStatistic/PayloadStatisticDroneFixing";
import PayloadStatisticFrequency from "./Payload/PayloadStatistic/PayloadStatisticFrequency";
import PayloadStatisticStatus from "./Payload/PayloadStatistic/PayloadStatisticStatus";
import PayloadStatisticTime from "./Payload/PayloadStatistic/PayloadStatisticTime";
import PayloadStatisticWorking from "./Payload/PayloadStatistic/PayloadStatisticWorking";
import AddSignupPayloadDrone from "./Payload/PayloadToDrone/Add";
import EditSignupPayloadDrone from "./Payload/PayloadToDrone/Edit";
import PayloadDroneHistory from "./Payload/PayloadToDrone/List";
import ListTypePayload from "./Payload/PayloadType/List";
import CreateReport from "./Report/CreateReport";
import ManageReportTemplate from "./Report/ManageReportTemplate";
import ViewReport from "./Report/ViewReport";
// Statistic
import DroneStatistic from "./Statistic/DroneStatistic";
import ImageVideoStatistic from "./Statistic/ImageVideoStatistic";
import IncidentStatistic from "./Statistic/IncidentStatistic";
import IncidentStatisticWorking from "./Statistic/IncidentStatisticWorking";
import StatisticObjectMonitor from "./Statistic/StatisticObjectMonitor";
import StatisticPayload from "./Statistic/StatisticPayload";
// dsd_01 drone
import TableDrone from './TableDrone';
import TableDroneState from './TableDroneState';
import UAVMana from './UAVMana';









export const routes = [ 
  {
    path: "/",
    component: Dashboard,
    exact: true,
  },
  {
    path: '/dedieu',
    component: HomeDeDieu,
  },
  {
    path: '/dedieu-ncn1',
    component: Task1,
  },
  {
    path: '/dedieu-ncn5',
    component: Task5,
  },
  {
    path: '/dedieu-ncn3',
    component: DeDieuNcn3,
  },
  {
    path: '/dashboard',
    component: Dashboard,
    exact: true,
  },
  {
    path: "/drones",
    component: () => <div>DroneManagement</div>,
  },
  {
    path: '/dedieu-uav-mana',
    component: UAVMana,
  },
  {
    path: '/drone-list',
    component: TableDrone,
  },
  {
    path: "/drone-state",
    component: TableDroneState,
  },
  {
    path: "/my-map-test",
    component: MapTest,
  },
  {
<<<<<<< HEAD
    path: '/flight-path',
    component: FlightPath,
=======
    path: "/flight-path",
    component: FlightPathManagement,
>>>>>>> dev
  },
  {
    path: "/flight-point",
    component: FlightPoint,
  },
  {
    path: "/flight-hub-monitor-campaigns/create",
    component: CreateMonitorCampaignPage,
  },
  {
    path: "/flight-hub-monitor-campaigns/update/:id",
    component: UpdateMonitorCampaignPage,
  },
  {
    path: "/flight-hub-monitor-campaigns/:id",
    component: DetailMonitorCampaignPage,
  },
  {
    path: "/flight-hub-monitor-campaigns",
    component: ListMonitorCampaignPage,
  },

  {
    path: "/flight-hub-other-params",
    component: ListLabelsPage,
  },
  //PAYLOAD
  {
    path: "/payloads",
    component: () => <div>PayloadManagement</div>,
  },
  {
    path: "/payload-management",
    component: ListPayload,
  },
  {
    path: "/payload-dscard",
    component: DScard,
  },
  {
    path: "/payload-type",
    component: ListTypePayload,
  },

  {
    path: "/payload-drone",
    component: PayloadDroneHistory,
  },
  {
    path: "/edit-signup-payload-drone",
    component: EditSignupPayloadDrone,
  },
  {
    path: "/add-signup-payload-drone",
    component: AddSignupPayloadDrone,
  },
  {
    path: "/payload-configuration",
    component: PayloadSetting,
  },
<<<<<<< HEAD
  {
    path: '/sucodedieu-statistics',
    component: StatisticDeDieu,
  },
  {
    path: '/sucodedieu-report',
    component: CreateReport,
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
=======
>>>>>>> dev
  {
    path: "/payload-statistic",
    component: PayloadStatistic,
  },
  {
    path: "/payload-statistic-type",
    component: PayloadStatisticFrequency,
  },
  {
    path: "/payload-statistic-time",
    component: PayloadStatisticTime,
  },
  {
    path: "/payload-statistic-work",
    component: PayloadStatisticWorking,
  },
  {
    path: "/payload-statistic-status",
    component: PayloadStatisticStatus,
  },
  {
    path: "/payload-statistic-fix",
    component: PayloadStatisticDroneFixing,
  },

  {
    path: "/metadata",
    component: () => <ImageVideo />,
  },
  {
    path: "/stream",
    component: () => <Stream />,
  },
  {
    path: "/image-video-detail/:id",
    component: () => <Detail />,
  },
  {
    path: "/problem",
    component: () => <div>Problem</div>,
  },
  {
    path: "/supervised-object",
    component: () => <div>Đối tượng giám sát</div>,
  },
  // view monitored Object
  {
    path: "/monitored-object-management/:option/:id",
    component: MonitoredObjectView,
    exact: true,
  },
  // create monitored Object
  {
    path: "/monitored-object-management/:option",
    component: MonitoredObjectCreate,
    exact: true,
  },
  //view List Monitored Object
  {
    path: "/monitored-object-management",
    component: MonitoredObject,
    exact: true,
  },
  //View Category Monitored
  {
    path: "/category-monitored-object-management",
    component: CategoryMonitored,
    exact: true,
  },
  {
    path: "/statistic",
    component: () => <div>Thống kê</div>,
  },
  {
    path: "/statistic-drone",
    component: DroneStatistic,
  },
  {
    path: "/statistic-payload",
    component: StatisticPayload,
  },
  {
    path: "/statistic-monitor-object",
    component: StatisticObjectMonitor,
  },
  {
    path: "/statistic-image-video",
    component: ImageVideoStatistic,
  },
  {
    path: "/incident-statistic",
    component: IncidentStatistic,
  },
  {
    path: "/incident-statistic-working",
    component: IncidentStatisticWorking,
  },
  {
    path: "/report",
    component: () => <div>Báo cáo</div>,
  },
  {
    path: "/create-report",
    component: CreateReport,
  },
  {
    path: "/view-report",
    component: ViewReport,
  },
  {
    path: "/manage-report-template",
    component: ManageReportTemplate,
  },
  {
    path: "/problems",
    component: () => <div>Sự cố</div>,
  },
  {
    path: "/warning",
    component: () => <MyList />,
  },
  {
    path: "/warning-detail/:id",
    component: () => <DetailedNotification />,
  },
  {
    path: "/activity-log",
    component: () => <div>Lịch sử hoạt động</div>,
  },
  {
    path: "/log-user",
    component: LogUser,
  },
  {
    path: "/log-drone",
    component: LogDrone,
  },
  {
    path: "/log-problem",
    component: LogProblem,
  },
  {
    path: "/log-warn",
    component: LogWarn,
  },
  {
    path: "/log-payload",
    component: LogPayLoad,
  },
  {
    path: "/log-image",
    component: LogImage,
  },
  {
    path: "/log-video",
    component: LogVideo,
  },
  {
    path: "/log-incident",
    component: LogIncident,
  },
  {
    path: "/log-objmonitor",
    component: LogObjMonitor,
  },
  {
    path: "/log-region",
    component: LogRegion,
  },
  {
    path: "/log-statistic",
    component: LogStatistic,
  },
  {
    path: "/log-uav",
    component: LogUAV,
  },
  {
    path: "/log-dash-board-page",
    component: LogDashboardPage,
  },
  {
    path: "/surveillance-domain-area",
    component: () => <div>Quản lý khu vực</div>,
  },
  {
    path: "/surveillance-domain-manage/edit",
    component: () => <ManageEdit />,
    exact: true,
  },
  {
    path: "/surveillance-domain-manage",
    component: () => <Manage />,
    exact: true,
  },
  {
    path: "/surveillance-area",
    component: () => <ManageArea />,
  },
  {
    path: "/surveillance-area-detail",
    component: () => <DetailArea />,
  },
  {
    path: "/handle-problem",
    component: Incident,
    exact: true,
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
  {
    path: "/user-meta",
    component: ListUserMeta,
  },
  {
    path: "/incidents",
    component: () => <IncidentGroup9 />,
    exact: true,
  },

  {
    path: "/incidents/:id",
    component: () => <IncidentEdit />,
    exact: true,
  },
  {
    path: "/imageGallery",
    component: () => <ImageGallery />,
    exact: true,
  },
  {
    path: "/videoGallery",
    component: () => <VideoGallery />,
  },
  {
    exact: true,
    path: "/role",
    component: ListRole,
  },
  {
    path: "/permission",
    component: ListPermission,
  },
  {
    path: "/role-permission",
    component: ListRolePermission,
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
        isLogin ? <Component {...props} /> : <Redirect to='/login' />
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
