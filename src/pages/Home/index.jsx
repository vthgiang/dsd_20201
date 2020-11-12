import React, { useEffect } from 'react';
import { Layout } from 'antd';
import StyleHome from './index.style';
import HomeContent from '../../containers/HomeContent';

const { Header, Content, Footer } = Layout;

const Home = () => {
  useEffect(() => {
    document.title = 'Home';
  }, [])
  return (
    <StyleHome>
      <Layout className='layout'>
        <Header className="he">
          <div className='logo' />
        </Header>
        <Content className="content">
          <div className='site-layout-content'>
            <HomeContent />
          </div>
        </Content>
        <Footer className="footer">
          ©2020 Designed by Group10
        </Footer>
      </Layout>
    </StyleHome>
  );
};

export default Home;
