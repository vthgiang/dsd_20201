import React from "react";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { Layout } from "antd";
import StyleHeader from "./index.style";
import Navbar from "../Navbar";

const Header = ({ collapsed, toggle }) => {
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
        <Navbar />
      </Layout.Header>
    </StyleHeader>
  );
};

export default Header;
