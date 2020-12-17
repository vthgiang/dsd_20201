import styled from 'styled-components';

export const StyleTitle = styled.div`
  font-size: 1.2em;
  font-weight: 500;
  color: #000000;
  margin: 0 0 12px;
`;

export const StyleSeparator = styled.div`
  height: ${(props) => props.height || 16}px;
`;

export const StyleTable = styled.div`
  .ant-table-cell {
    padding: 8px;
  }
`;

export const StyleSearchForm = styled.div`
  padding: 16px;
  background: rgba(0, 0, 0, 0.015);
  border: 1px solid #e2e8f0;
  border-radius: 2px;
  .ant-form-item {
    display: flex;
  }
  .ant-form-item-control-wrapper {
    flex: 1;
  }
`;
