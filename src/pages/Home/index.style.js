import styled from "styled-components";

const StyleHome = styled.div`
  .header {
    display: flex;
    justify-content: space-between;
  }
  .layout {
    height: 100vh;
  }
  .site-layout-content {
    min-height: 280px;
    padding: 24px;
    background: #fff;
    height: 100%;
  }
  .logo {
    float: left;
    width: 120px;
    height: 31px;
    margin: 16px 24px 16px 0;
    background: rgba(255, 255, 255, 0.3);
  }
  .content {
    padding: 50px 50px 0 50px;
  }
  .footer {
    text-align: center;
  }
  .ant-row-rtl #components-layout-demo-top .logo {
    float: right;
    margin: 16px 0 16px 24px;
  }
`;
export default StyleHome;
