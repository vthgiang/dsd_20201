import React, { useEffect, useState } from 'react';
import StyleStep5 from './index.style';
import {
  Button,
  Col,
  Form,
  Input,
  Select,
  Row,
  Modal,
  notification,
} from 'antd';
import { VALIDATE_MESSAGES, LAYOUT } from '../config';
import {
  ExclamationCircleOutlined,
  FormOutlined,
  StepBackwardOutlined,
} from '@ant-design/icons';
import { convertFieldValuesToDataSubmit } from '../services';

import { getListLabelsApi } from '../../../../apis/label';

const { TextArea } = Input;

const Step5 = ({ prevStep, data, handleChangeData, handleSubmit }) => {
  const [labelsData, setLabelsData] = useState([]);

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data, form]);

  useEffect(() => {
    const fetchListLabelsData = async () => {
      try {
        const resp = await getListLabelsApi();
        if (
          !resp ||
          !resp.status ||
          !resp.result ||
          !Array.isArray(resp.result)
        ) {
          throw new Error('Máy chủ lỗi');
        }
        setLabelsData(resp.result);
      } catch (error) {
        notification.error({
          message: 'Máy chủ lỗi, vui lòng thử lại sau',
        });
      }
    };
    fetchListLabelsData();
  }, []);

  const handleCreate = (dataSubmit) => async () => {
    await handleSubmit(dataSubmit);
  };

  const submitConfirm = (dataSubmit) => {
    const { name } = dataSubmit;
    Modal.confirm({
      title: 'Xác nhận',
      icon: <ExclamationCircleOutlined />,
      content: (
        <span>
          Bạn có muốn {data.description ? 'sửa' : 'tạo'} đợt giám sát{' '}
          <strong>{name}</strong>?
        </span>
      ),
      okText: 'Đồng ý',
      cancelText: 'Hủy',
      onOk: handleCreate(dataSubmit),
    });
  };

  const onFinish = (values) => {
    handleChangeData(values);
    const fieldValues = { ...data, ...values };
    const dataSubmit = convertFieldValuesToDataSubmit(fieldValues);
    submitConfirm(dataSubmit);
  };

  return (
    <StyleStep5>
      <Form
        {...LAYOUT}
        form={form}
        name="flight-hub-create"
        onFinish={onFinish}
        validateMessages={VALIDATE_MESSAGES}
      >
        <Form.Item
          name="labels"
          label="Nhãn đính kèm"
          rules={[{ type: 'array', required: false }]}
        >
          <Select mode="multiple" allowClear placeholder="Chọn nhãn đính kèm">
            {labelsData.map(({ _id, name }) => {
              return (
                <Select.Option key={_id} value={_id}>
                  {name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name="description"
          label="Ghi chú"
          rules={[{ type: 'string', required: false }]}
        >
          <TextArea
            placeholder="Để lại lời nhắn..."
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
        </Form.Item>
        <Col offset={6}>
          <Row>
            <Button
              type="default"
              icon={<StepBackwardOutlined />}
              onClick={prevStep}
            >
              Quay lại
            </Button>
            &ensp;
            <Button type="primary" icon={<FormOutlined />} htmlType="submit">
              Lưu
            </Button>
          </Row>
        </Col>
      </Form>
    </StyleStep5>
  );
};

export default Step5;
