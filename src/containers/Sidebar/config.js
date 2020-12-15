export const sidebarMenu = [
  {
    key: 'Dashboard',
    heading: 'Bảng điều khiển',
    icon: 'fa fa-home-alt',
    route: '/dashboard',
  },
  {
    key: 'Drones',
    heading: 'Điều khiển drone',
    icon: 'fas fa-drone-alt',
    route: '/drones',
    subMenu: [
      {
        key: 'DroneState',
        heading: 'Tình trạng drone',
        icon: 'fal fa-monitor-heart-rate',
        route: '/drone-state',
      },
      {
        key: 'FlySetting',
        heading: 'Thiết lập đường bay',
        icon: 'fa fa-user-chart',
        route: '/fly-setting',
      },
      {
        key: 'DroneStatistic',
        heading: 'Thống kê drone',
        icon: 'fa fa-file-chart-line',
        route: '/drone-statistic',
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
  },
  {
    key: 'GeneralStatistic',
    heading: 'Báo cáo thống kê',
    icon: 'fas fa-chart-line',
    route: '/statistic',
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
        heading: 'Lịch sử hoạt động của drone',
        icon: 'fas fa-drone-alt',
        route: '/log-drone',
      },
      {
        key: 'LogPayLoad',
        heading: 'Lịch sử hoạt động của PayLoad',
     
        icon: 'fas fa-layer-group',
        route: '/log-payload',
      },
      {
        key: 'LogUser',
        heading: 'Lịch sử hoạt động người dùng',
        icon: 'fas fa-user-circle',
        route: '/log-user',
      },
      {
        key: 'LogImage',
        heading: 'Lịch sử lưu trữ hình ảnh',
        icon: 'fas fa-images',
        route: '/log-image',
      },
      {
        key: 'LogVideo',
        heading: 'Lịch sử lưu trữ video',
        icon: 'fas fa-images',
        route: '/log-video',
      },
      {
        key: 'LogProblem',
        heading: 'Lịch sử sự cố',
        icon: 'fas fa-toolbox',
        route: '/log-problem',
      },
      {
        key: 'LogObjMonitor',
        heading: 'Lịch sử hoạt động của đối tượng giám sát',
        icon: 'fas fa-binoculars',
        route: '/log-objmonitor',
      },
      {
        key: 'LogWarn',
        heading: 'Lịch sử cảnh báo',
        icon: 'far fa-bell',
        route: '/log-warn',
      },
      {
        key: 'LogIncident',
        heading: 'Lịch sử xử lý sự cố',
        icon: 'fas fa-toolbox',
        route: '/log-incident',
      },
      
      {
        key: 'LogRegion',
        heading: 'Lịch sử hoạt động của miền giám sát',
        icon: 'fas fa-crop-alt',
        route: '/log-region',
      },
      {
        key: 'LogStatistic',
        heading: 'Lịch sử báo cáo, thống kê',
        icon: 'fa fa-file-chart-line',
        route: '/log-statistic',
      },
      {
        key: 'LogUAV',
        heading: 'Lịch sử kết nối UAV',
        icon: 'fas fa-images',
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
      },
      {
        key: 'DepartmentSetting',
        heading: 'Quản lý phòng ban',
        icon: 'fa fa-building',
        route: '/department',
      },
      {
        key: 'UserMetaSetting',
        heading: 'Lịch sử người dùng',
        icon: 'fa fa-history',
        route: '/user-meta',
      },
    ],
  },
];