import styled from 'styled-components';

export default styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const StyleContent = styled.div`
  /* flex: 1; */
  border: 1px dashed #e9e9e9;
  border-radius: 2px;
  background-color: rgba(0, 0, 0, 0.0015);
  margin-top: 24px;
  padding: 16px;
`;

export const StyleIconBack = styled.div`
  margin-bottom: 12px;
  margin-right: 7.5px;
`;

export const StyleSpinContainer = styled.div`
  width: 100%;
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
