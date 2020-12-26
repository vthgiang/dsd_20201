export const sidebarMenu = [
  {
    key: 'Dashboard',
    heading: 'Bảng điều khiển',
    icon: 'fa fa-home-alt',
    route: '/dashboard',
  },
  {
key:'DSD_05_De_Dieu',
heading:'DSD_05_De_Dieu',
route:'/DSD_05_De_Dieu',
subMenu:[
  {
key:'Task1',
heading:'Task1',
route:'/Task1',
},
{
  key:'Task5',
  heading:'Task5',
  route:'/Task5',

}
],
  },
  {
    key: 'Drones',
    heading: 'Điều khiển drone',
    icon: 'fas fa-drone-alt',
    route: '/drones',
    subMenu: [
      {
        key: 'DroneState',
        heading: 'Danh sách drone',
        icon: 'fal fa-monitor-heart-rate',
        route: '/drone-list',
      },
      {
        key: 'FlightPathManagement',
        heading: 'Quản lý đường bay',
        icon: 'fas fa-route',
        route: '/flight-path',
      },
      {
        key: 'DroneStatistic',
        heading: 'Thống kê drone',
        icon: 'fa fa-file-chart-line',
        route: '/drone-state',
      },
    ],
  },
  {
    key: 'FlightHub',
    heading: 'Flight hub',
    icon: 'fab fa-hubspot',
    route: '/flight-hub',
    subMenu: [
      {
        key: 'MonitorCampaign',
        heading: 'Quản lý đợt giám sát',
        icon: 'fal fa-camera-alt',
        route: '/flight-hub-monitor-campaigns',
      },
      {
        key: 'OtherParams',
        heading: 'Nhãn đính kèm',
        icon: 'fa fa-puzzle-piece',
        route: '/flight-hub-other-params',
      },
    ],
  },
  {
    key: 'Payloads',
    heading: 'Payloads',
    icon: 'fas fa-layer-group',
    route: '/payloads',
    subMenu: [
      {
        key: 'PayloadManagement',
        heading: 'Quản lý payload',
        icon: 'fal fa-monitor-heart-rate',
        route: '/payload-management',
      },
      {
        key: 'PayloadSDcard',
        heading: 'DSCard Payload',
        icon: 'fa fa-tools',
        route: '/payload-dscard',
      },
      {
        key: 'PayloadType',
        heading: 'Quản lý loại payload',
        icon: 'fa fa-tasks',
        route: '/payload-type',
      },
      {
        key: 'PayloadStatistic',
        heading: 'Thống kê Payload',
        icon: 'fa fa-file-chart-line',
        route: '/payload-statistic',
      },
      {
        key: 'PayloadToDrone',
        heading: 'Payload - Drone',
        icon: 'fa fa-drone-alt',
        route: '/payload-drone',
      },
    ],
  },
  {
    key: 'metadata',
    heading: 'Hình ảnh và video',
    icon: 'fas fa-images',
    subMenu: [
      {
        key: 'ImageVideo',
        heading: 'Quản lý hình ảnh, video',
        icon: 'fal fa-monitor-heart-rate',
        route: '/metadata',
      },
      {
        key: 'Stream',
        heading: 'Stream',
        icon: 'fal fa-monitor-heart-rate',
        route: '/stream',
      }
    ]
  },
  {
    key: 'Problems',
    heading: 'Sự cố',
    icon: 'fas fa-times-octagon',
    subMenu: [
      {
        key: 'Problems-list',
        heading: 'Danh sách sự cố',
        icon: 'fas fa-list',
        route: '/incidents',
      },
      {
        key: 'Propblems-imageGallery',
        heading: 'Tạo offline',
        icon: 'fas fa-images',
        route: '/imageGallery',
      },
      {
        key: 'Propblems-videoGallery',
        heading: 'Tạo từ tream',
        icon: 'fas fa-images',
        route: '/videoGallery',
      },
    ],
  },

  {
    key: 'SupervisedObject',
    heading: 'Đối tượng giám sát',
    icon: 'fas fa-binoculars',
    route: '/supervised-object',
    subMenu: [
      {
        key: 'CategoryMonitored',
        heading: 'Quản lý danh mục giám sát',
        icon: 'fa fa-bars',
        route: '/category-monitored-object-management',
      },
      {
        key: 'MonitoredObject',
        heading: 'Quản lý đối tượng giám sát',
        icon: 'fa fa-database',
        route: '/monitored-object-management',
      },
    ],
  },
  {
    key: 'GeneralReport',
    heading: 'Báo cáo',
    icon: 'fas fa-book',
    route: '/report',
    subMenu: [
      {
        key: 'CreateReport',
        heading: 'Tạo báo cáo',
        icon: 'fas fa-drone-alt',
        route: '/create-report',
      },
      {
        key: 'ViewReport',
        heading: 'Xem báo cáo',
        icon: 'fas fa-drone-alt',
        route: '/view-report',
      },
      {
        key: 'ManageReportTemplate',
        heading: 'Quản lý mẫu báo cáo',
        icon: 'fas fa-drone-alt',
        route: '/manage-report-template',
      },
    ],
  },
  {
    key: 'Warning',
    heading: 'Cảnh báo',
    icon: 'far fa-bell',
    route: '/warning',
  },
  {
    key: 'ActivityLog',
    heading: 'Lịch sử hoạt động',
    icon: 'fas fa-file-signature',
    route: '/activity-log',
    subMenu: [

      {
        key: 'LogDrone',
        heading: 'Drone',
        icon: 'fas fa-drone-alt',
        route: '/log-drone',
      },
      {
        key: 'LogPayLoad',
        heading: 'PayLoad',

        icon: 'fas fa-layer-group',
        route: '/log-payload',
      },
      {
        key: 'LogUser',
        heading: 'User',
        icon: 'fas fa-user-circle',
        route: '/log-user',
      },
      {
        key: 'LogImage',
        heading: 'Image',
        icon: 'fas fa-images',
        route: '/log-image',
      },
      {
        key: 'LogVideo',
        heading: 'Video',
        icon: 'fas fa-film',
        route: '/log-video',
      },
      {
        key: 'LogProblem',
        heading: 'Sự cố',
        icon: 'fas fa-toolbox',
        route: '/log-problem',
      },
      {
        key: 'LogObjMonitor',
        heading: 'Đối tượng giám sát',
        icon: 'fas fa-binoculars',
        route: '/log-objmonitor',
      },
      {
        key: 'LogWarn',
        heading: 'Cảnh báo',
        icon: 'far fa-bell',
        route: '/log-warn',
      },
      {
        key: 'LogIncident',
        heading: 'Xử lý sự cố',
        icon: 'fas fa-toolbox',
        route: '/log-incident',
      },

      {
        key: 'LogRegion',
        heading: 'Miền giám sát',
        icon: 'fas fa-crop-alt',
        route: '/log-region',
      },
      {
        key: 'LogStatistic',
        heading: 'Báo cáo, thống kê',
        icon: 'fa fa-file-chart-line',
        route: '/log-statistic',
      },
      {
        key: 'LogUAV',
        heading: 'Kết nối UAV',
        icon: 'fal fa-drone',
        route: '/log-uav',
      },
    ],
  },
  {
    key: 'SurveillanceDomain',
    heading: 'Miền giám sát',
    icon: 'fas fa-crop-alt',
    route: '/surveillance-domain',
    subMenu: [
      {
        key: 'SurveillanceDomainArea',
        heading: 'Quản lý khu vực',
        icon: 'fas fa-crop-alt',
        route: '/surveillance-area',
      },
      {
        key: 'SurveillanceDomainManage',
        heading: 'Quản lý miền giám sát',
        icon: 'fas fa-crop-alt',
        route: '/surveillance-domain-manage',
      },
    ],
  },
  {
    key: 'HandleProblem',
    heading: 'Xử lý sự cố',
    icon: 'fas fa-toolbox',
    route: '/handle-problem',
  },
  {
    key: 'UserManagement',
    heading: 'Người dùng',
    icon: 'fas fa-user-circle',
    route: '/user-management',
    subMenu: [
      {
        key: 'UserSetting',
        heading: 'Quản lý người dùng',
        icon: 'fa fa-users',
        route: '/user',
        resource: 'User.find'
      },
      {
        key: 'DepartmentSetting',
        heading: 'Quản lý phòng ban',
        icon: 'fa fa-building',
        route: '/department',
        resource: 'Department.find'
      },
      {
        key: 'UserMetaSetting',
        heading: 'Lịch sử người dùng',
        icon: 'fa fa-history',
        route: '/user-meta',
        resource: 'UserMeta.find'
      },
      {
        key: 'RoleSetting',
        heading: 'Quản lý chức vụ',
        icon: 'fa fa-users-cog',
        route: '/role',
        resource: 'Role.system'
      },
      {
        key: 'PermissionSetting',
        heading: 'Quản lý quyền',
        icon: 'fa fa-lock',
        route: '/permission',
        resource: 'Permission.system'
      },
      {
        key: 'RolePermission',
        heading: 'Phân quyền',
        icon: 'fa fa-user-lock',
        route: '/role-permission',
        resource: 'RolePermission.system'
      },
    ],
  },
];