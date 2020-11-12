import React, { useEffect } from "react";
import { Layout } from "antd";
import StyleHome from "./index.style";
import HomeContent from "../../containers/HomeContent";
import Navbar from "../../containers/Navbar";
import Logo from "../../components/Logo";

const { Header, Content, Footer } = Layout;

const Home = () => {
  useEffect(() => {
    document.title = "Home";
  }, []);
  return (
    <StyleHome>
      <Layout className="layout">
        <Header className="header">
          <Logo></Logo>
          <Navbar></Navbar>
        </Header>
        <Content className="content">
          <div className="site-layout-content">
            <HomeContent />
          </div>
        </Content>
        <Footer className="footer">©2020 Designed by Group10</Footer>
      </Layout>
    </StyleHome>
  );
};

export default Home;
