import styled from "styled-components";

export default styled.div``;

export const StyleNavItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 0 5px;
  line-height: 64px;
  height: 64px;
`;

export const StyleUserProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 5px;
  padding-bottom: 6px;

  .ant-badge {
    height: 32px;
    line-height: 32px;
    margin-right: 5px;
    .ant-badge-dot {
      top: 5px;
      right: 5px;
      width: 10px;
      height: 10px;
    }
  }
`;

export const StyleUserName = styled.div`
  flex: 1;
  display: flex;
  margin-top: 5px;
  flex-direction: column;
  justify-content: space-between;
  .text-info {
    height: 16px;
    line-height: 16px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 120px;
    min-width: 100px;
    color: gray;
  }
  .role {
    color: red;
  }
`;
