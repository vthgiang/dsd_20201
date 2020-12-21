import React, { useState, useRef } from 'react';
import { Form, Input, Button } from 'antd';
import TagGroup from './TagGroup';
import useBaseHook from '../../../hooks/BaseHooks';
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const buttonItemLayout = {
  wrapperCol: { span: 20, offset: 4 },
};

const VideoForm = ({ onStartIncident, onStopIncident }) => {
  const { notify, getData } = useBaseHook();
  const [form] = Form.useForm();
  let tagRef = useRef();
  const [start, setStart] = useState(true);
  const onStart = () => {
    setStart(false);
    onStartIncident();
  };
  const onStop = () => {
    let tags = tagRef.getTags() || [];
    if (!tags.length) {
      notify('Bạn chưa gán nhãn cho sự cố', '', 'error');
      return;
    }
    onStopIncident(tags);
    setStart(true);
  };

  return (
    <>
      <Form
        {...formItemLayout}
        layout={'horizontal'}
        form={form}
        // initialValues={{ layout: formLayout }}
      >
        <div style={{ marginTop: '16px' }}>
          <Form.Item>
            {start ? (
              <Button type="primary" onClick={onStart}>
                Start
              </Button>
            ) : (
              <Button danger onClick={onStop}>
                Stop
              </Button>
            )}
          </Form.Item>
        </div>
        <TagGroup
          ref={(instance) => {
            tagRef = instance;
          }}
        />
      </Form>
    </>
  );
};
export default VideoForm;
