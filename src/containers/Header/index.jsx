import React, { useState } from "react";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { Layout } from "antd";
import StyleHeader from "./index.style";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";
import { types } from "../../modules/user/config/UserConfig";

const Header = ({ collapsed, toggle }) => {
  const isLogin = useSelector(state => state.user.isLogin);
  const projectType = useSelector(state => state.user.projectType);

  const getByField = (list, fieldName, value) => {
    var retVal = null;
    list.forEach(function (item) {
        if (item[fieldName] == value) {
            retVal = item;
        }
    });
    //return
    return retVal;
  };
  return (
    <StyleHeader>
      <Layout.Header className="header-content" style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: "trigger",
            onClick: toggle,
          }
        )}
        </div>
        <div>
          <h1 style={{ fontWeight: "bold", textTransform: "uppercase" }}>{getByField(types, "code", projectType) && getByField(types, "code", projectType).name }</h1>
        </div>
        <div>
          {isLogin && <Navbar />}
        </div>
      </Layout.Header>
    </StyleHeader>
  );
};

export default Header;
