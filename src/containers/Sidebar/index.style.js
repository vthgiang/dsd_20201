import styled from "styled-components";

export const StyleSidebarMenu = styled.div`
  .ant-menu-item {
    display: flex;
    align-items: center;
    padding: 0 20px !important;
  }
  .ant-menu-submenu {
    .ant-menu-submenu-title {
      padding: 0 20px !important;
    }
    .ant-menu-item {
      padding-left: 40px !important;
    }
  }

  .collapsed {
    opacity: ${(props) => (props.collapsed ? 0 : 1)};
  }

  .ant-menu-inline-collapsed {
    > .ant-menu-item {
      text-align: center;
      padding: 0 28px !important;
    }
    > .ant-menu-item-group {
      > .ant-menu-item-group-list {
        > .ant-menu-item {
          text-align: center;
          padding: 0 28px !important;
        }
        > .ant-menu-submenu {
          > .ant-menu-submenu-title {
            text-align: center;
            padding: 0 28px !important;
          }
        }
      }
    }
    > .ant-menu-submenu {
      > .ant-menu-submenu-title {
        text-align: center;
        padding: 0 28px !important;
      }
    }
  }
`;
