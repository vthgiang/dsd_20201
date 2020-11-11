import styled from "styled-components";

const StyleLayout = styled.div`
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: #fff;
    }
  }

  .ant-layout-content {
    background: white;
    min-height: calc(100vh - 64px);
    padding: 12px 24px;
  }
`;
export default StyleLayout;
