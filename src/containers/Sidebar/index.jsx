import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation, useHistory } from "react-router-dom";
import { StyleSidebarMenu } from "./index.style";
import Logo from "../../components/Logo";
import { sidebarMenu } from "./config";

const { Sider } = Layout;
const { SubMenu } = Menu;

const Sidebar = ({ collapsed, toggle }) => {
  const [key, setKey] = useState("Dashboard");
  const { pathname } = useLocation();
  const history = useHistory();

  useEffect(() => {
    const currentRoute = `/${pathname.split("/")[1]}`;
    const getFirstRouteMounted = (menu) => {
      for (let idx = 0; idx < menu.length; idx++) {
        const menuItem = menu[idx];
        const { subMenu } = menuItem;
        if (!subMenu) {
          if (menuItem.route === currentRoute) {
            return menuItem;
          }
        } else {
          const result = getFirstRouteMounted(subMenu);
          if (result) return result;
        }
      }
    };
    const { key, heading } = getFirstRouteMounted(sidebarMenu) || {};
    if (key) {
      setKey(key);
      document.title = heading;
    }
  }, [pathname, key]);

  const handleClickMenu = (menuItem) => {
    const { key, heading, route } = menuItem;
    if (pathname === route) return;
    setKey(key);
    document.title = heading;
    history.push(route);
  };

  const renderListMenu = (menu) => {
    return menu.map((menuItem) => {
      const { subMenu = [], key, heading, icon } = menuItem;
      if (!subMenu.length) {
        return (
          <Menu.Item
            key={key}
            icon={<i className={`${icon} menu-item-icon`} />}
            onClick={() => handleClickMenu(menuItem)}
          >
            <span className="collapsed">{heading}</span>
          </Menu.Item>
        );
      }
      return (
        <SubMenu
          key={key}
          title={
            <span>
              <i className={`${icon} menu-item-icon`} />
              <span className="collapsed">{heading}</span>
            </span>
          }
        >
          {renderListMenu(subMenu)}
        </SubMenu>
      );
    });
  };

  return (
    <Sider
      breakpoint="lg"
      width={210}
      collapsedWidth="80px"
      collapsible
      trigger={null}
      collapsed={collapsed}
      onCollapse={() => {
        toggle();
      }}
    >
      <Link to="/">
        <Logo collapsed={collapsed}></Logo>
      </Link>
      <StyleSidebarMenu collapsed={collapsed}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["Dashboard", key]}
          selectedKeys={key}
          triggerSubMenuAction="click"
        >
          {renderListMenu(sidebarMenu)}
        </Menu>
      </StyleSidebarMenu>
    </Sider>
  );
};

export default Sidebar;
