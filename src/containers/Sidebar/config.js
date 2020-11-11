export const sidebarMenu = [
  {
    key: "Dashboard",
    heading: "Bảng điều khiển",
    icon: "fa fa-home-alt",
    route: "/dashboard",
  },
  {
    key: "Drones",
    heading: "Điều khiển drone",
    icon: "fa fa-home-alt",
    route: "/drones",
    subMenu: [
      {
        key: "DroneState",
        heading: "Tình trạng drone",
        icon: "fa fa-chart-pie",
        route: "/call-report",
      },
      {
        key: "FlySetting",
        heading: "Thiết lập đường bay",
        icon: "fa fa-user-chart",
        route: "/agent-report",
      },
      {
        key: "DroneStatistic",
        heading: "Thống kê drone",
        icon: "fa fa-file-chart-line",
        route: "/sla-report",
      },
    ],
  },
  {
    key: "FlightHub",
    heading: "Flight hub",
    icon: "fa fa-home-alt",
    route: "/flight-hub",
  },
  {
    key: "Payloads",
    heading: "Payloads",
    icon: "fa fa-chart-bar",
    route: "/payloads",
  },
  {
    key: "metadata",
    heading: "Hình ảnh và video",
    icon: "fa fa-assistive-listening-systems",
    route: "/metadata",
  },
];
