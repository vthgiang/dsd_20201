import React, { useState } from "react";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { Layout } from "antd";
import StyleHeader from "./index.style";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";

const Header = ({ collapsed, toggle }) => {
  const isLogin = useSelector(state => state.user.isLogin);

  return (
    <StyleHeader>
      <Layout.Header className="header-content">
        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: "trigger",
            onClick: toggle,
          }
        )}
        {isLogin && <Navbar />}
      </Layout.Header>
    </StyleHeader>
  );
};

export default Header;
