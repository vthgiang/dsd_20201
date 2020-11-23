/* eslint-disable no-template-curly-in-string */
import React, { useEffect } from 'react';
import { Form, Input, Button, Modal, Row } from 'antd';

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
  layout: 'horizontal',
};

const validateMessages = {
  required: '"${label}" không được để trống!',
  types: {
    email: '"${label}" không đúng định dạng!',
    number: '"${label}" phải là số!',
  },
  number: {
    range: '"${label}" phải nằm trong đoạn ${min} đến ${max}',
  },
};

const defaultValues = {};

const ParamForm = ({
  visible,
  onCancel,
  title,
  onOk,
  okText = 'OK',
  cancelText = 'Hủy',
  initialValues = defaultValues,
  isDetails = false,
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(initialValues);
  }, [initialValues]);

  const onFinish = (values) => {
    onOk(values);
  };

  const showExpandDetails = () => {
    return (
      <>
        <Form.Item name="createdAt" label="Ngày tạo">
          <Input disabled />
        </Form.Item>

        <Form.Item name="updatedAt" label="Ngày cập nhật">
          <Input disabled />
        </Form.Item>
      </>
    );
  };

  return (
    <Modal
      width="50vw"
      title={title}
      visible={visible}
      onCancel={onCancel}
      footer={false}
    >
      <Form
        {...layout}
        form={form}
        name="paramForm"
        validateMessages={validateMessages}
        onFinish={onFinish}
        initialValues={initialValues}
        scrollToFirstError
        className="param-form"
      >
        <Form.Item
          name="name"
          label="Tên tham số"
          rules={[{ type: 'string', required: !isDetails }]}
        >
          <Input disabled={isDetails} placeholder="Nhập tên tham số" />
        </Form.Item>

        <Form.Item name="description" label="Mô tả">
          <Input disabled={isDetails} placeholder="Nhập mô tả tham số" />
        </Form.Item>

        <Form.Item
          name="mappingField"
          label="Trường dữ liệu "
          rules={[{ type: 'string', required: !isDetails }]}
        >
          <Input disabled={isDetails} placeholder="Nhập trường mapping" />
        </Form.Item>

        {isDetails && showExpandDetails()}

        <Row type="flex" justify="end" align="middle">
          {!isDetails && (
            <Button htmlType="button" onClick={onCancel}>
              {cancelText}
            </Button>
          )}
          &ensp;
          <Button htmlType="submit" type="primary">
            {okText}
          </Button>
        </Row>
      </Form>
    </Modal>
  );
};

export default ParamForm;
