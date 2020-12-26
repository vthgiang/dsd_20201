import React, { useEffect } from "react";
import { Layout } from "antd";
import StyleHome from "./index.style";
import HomeContent from "../../containers/HomeContent";
import Navbar from "../../containers/Navbar";
import Logo from "../../components/Logo";
import { useSelector } from "react-redux";

const { Header, Content, Footer } = Layout;

const Home = () => {
    const user = useSelector((state) => state.user);
    console.log('USER DATA LOGIN: ', user);
    useEffect(() => {
        document.title = "Home";
    }, []);
    const isLogin = useSelector(state => state.user.isLogin);

  return (
    <StyleHome>
      <Layout className="layout">
        <Header className="header">
          <Logo></Logo>
          {isLogin && <Navbar></Navbar>}
        </Header>
        <Content className="content">
          <div className="site-layout-content">
            <HomeContent />
          </div>
        </Content>
        <Footer className="footer" style={{bottom: 0}}>©2020 Designed by Group10</Footer>
      </Layout>
    </StyleHome>
  );
};

export default Home;
