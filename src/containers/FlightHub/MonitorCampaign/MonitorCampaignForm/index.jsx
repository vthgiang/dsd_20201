import React, { useState, useEffect } from 'react';
import { Row, Steps, Spin } from 'antd';
import { StyleTitle } from '../../../../themes/default';
import StyleMonitorCampaignForm, {
  StyleContent,
  StyleIconBack,
} from './index.style';
import { STEPS } from '../config';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { StyleSpinContainer } from './index.style';

const { Step } = Steps;

const MonitorCampaignForm = ({ initialData, title, handleSubmit, loading }) => {
  const history = useHistory();
  const [current, setCurrent] = React.useState(0);
  const [data, setData] = useState({});

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const nextStep = () => {
    if (current === Object.keys(STEPS).length - 1) return;
    setCurrent(current + 1);
  };

  const prevStep = () => {
    if (current === 0) return;
    setCurrent(current - 1);
  };

  const handleChangeData = (values) => {
    setData({ ...data, ...values });
  };

  const renderContent = () => {
    const Component = STEPS[current].content;
    if (loading)
      return (
        <StyleSpinContainer>
          <Spin />
        </StyleSpinContainer>
      );
    return (
      <Component
        nextStep={nextStep}
        prevStep={prevStep}
        data={data}
        handleSubmit={handleSubmit}
        handleChangeData={handleChangeData}
      />
    );
  };

  const goBack = () => {
    history.goBack();
  };
  return (
    <StyleMonitorCampaignForm>
      <Row type='flex' align='middle'>
        <StyleIconBack>
          <ArrowLeftOutlined size={32} onClick={goBack} />
        </StyleIconBack>
        <StyleTitle>{title}</StyleTitle>
      </Row>
      <Steps current={current}>
        {STEPS.map(({ title, description }) => (
          <Step key={title} title={title} description={description} />
        ))}
      </Steps>
      <StyleContent>{renderContent()}</StyleContent>
    </StyleMonitorCampaignForm>
  );
};

export default MonitorCampaignForm;
