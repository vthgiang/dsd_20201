import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import StyleLayout from "./index.style";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

const { Content } = Layout;

const MainLayout = ({ children, history }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const projectType = useSelector(state => state.user.projectType);

  useEffect(() => {
    if (!projectType) {
      history.push("/home");
    }
  }, []);

  return (
    <StyleLayout>
      <Layout>
        <Sidebar collapsed={collapsed} toggle={toggle} />
        <Layout className="site-layout">
          <Header collapsed={collapsed} toggle={toggle} />
          <Content>{children}</Content>
        </Layout>
      </Layout>
    </StyleLayout>
  );
};

export default withRouter(MainLayout);
