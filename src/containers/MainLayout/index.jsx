import React, { useEffect, useState } from "react";
import {Layout, Menu} from "antd";
import StyleLayout from "./index.style";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import {AppstoreAddOutlined, BarChartOutlined, EyeOutlined, SettingOutlined, StockOutlined} from "@ant-design/icons";
import PropTypes from 'prop-types';

const propTypes = {
  location: PropTypes.object.isRequired
};
const { Content } = Layout;

const MainLayout = ({ children, history }) => {

  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const projectType = useSelector(state => state.user.projectType);

  const [current] = useState(null);

  useEffect(() => {
    if (!projectType) {
      history.push("/home");
    }
  }, []);

  if(projectType == "DE_DIEU"){
    return (
        <StyleLayout>
          <Layout>
            <Sidebar collapsed={collapsed} toggle={toggle} />
            <Layout className="site-layout">
              <Header collapsed={collapsed} toggle={toggle} />
              <Content>
                <div>
                  <Menu onClick={(e) => this.current = e.key } selectedKeys={current} mode="horizontal">
                    <Menu.Item  key="ncn1" icon={<EyeOutlined />}>
                      <a className="margin-left-12" href={"/dedieu-ncn1"} rel="noopener noreferrer">
                        Nhóm chức năng 1
                        <br/>
                        Theo dõi giám sát sự cố
                      </a>
                    </Menu.Item>
                    <Menu.Item key="ncn2" icon={<BarChartOutlined />}>
                      <a className="margin-left-12" href={"/dedieu"}  rel="noopener noreferrer">
                        Nhóm chức năng 2
                        <br/>
                        Dữ liệu, tra cứu, thống kê
                      </a>
                    </Menu.Item>
                    <Menu.Item key="ncn3" icon={<StockOutlined />}>
                      <a className="margin-left-12" href={"/dedieu"}  rel="noopener noreferrer">
                        Nhóm chức năng 3
                        <br/>
                        Phân tích phát hiện sự cố
                      </a>
                    </Menu.Item>
                    <Menu.Item key="ncn4" icon={<AppstoreAddOutlined />}>
                      <a className="margin-left-12" href={"/dedieu-ncn4"} rel="noopener noreferrer">
                        Nhóm chức năng 4
                        <br/>
                        Quản lý, điều khiển UAV
                      </a>
                    </Menu.Item>
                    <Menu.Item key="ncn5" icon={<SettingOutlined />}>
                      <a className="margin-left-12" href={"/user"} rel="noopener noreferrer">
                        Nhóm chức năng 5
                        <br/>
                        Quản trị và nâng cao
                      </a>
                    </Menu.Item>
                  </Menu>
                </div>
                <br/>
                {children}
              </Content>
            </Layout>
          </Layout>
        </StyleLayout>
    );
  }

  else return (
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
