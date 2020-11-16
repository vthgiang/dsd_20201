import React, { useState } from 'react';
import { Steps } from 'antd';
import { StyleTitle } from '../../themes/default';
import StyleFlightHub, { StyleContent } from './index.style';
import { steps, MAX_STEPS_SIZE } from './config';

const { Step } = Steps;

const FlightHub = () => {
  const [current, setCurrent] = React.useState(0);
  const [data, setData] = useState({});

  const nextStep = () => {
    if (current === MAX_STEPS_SIZE - 1) return;
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
    const Component = steps[current].content;
    return (
      <Component
        nextStep={nextStep}
        prevStep={prevStep}
        data={data}
        handleChangeData={handleChangeData}
      />
    );
  };

  return (
    <StyleFlightHub>
      <StyleTitle>Cấu hình Flight Hub</StyleTitle>
      <Steps current={current}>
        {steps.map(({ title, description }) => (
          <Step key={title} title={title} description={description} />
        ))}
      </Steps>
      <StyleContent>{renderContent()}</StyleContent>
    </StyleFlightHub>
  );
};

export default FlightHub;
