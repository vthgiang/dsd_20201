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

const LabelForm = ({
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
  }, [initialValues, form]);

  const onFinish = (values) => {
    onOk(values);
    form.resetFields();
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
        name="labelForm"
        validateMessages={validateMessages}
        onFinish={onFinish}
        initialValues={initialValues}
        scrollToFirstError
        className="label-form"
      >
        <Form.Item
          name="name"
          label="Tên nhãn"
          rules={[{ type: 'string', required: !isDetails }]}
        >
          <Input disabled={isDetails} placeholder="Nhập tên nhãn" />
        </Form.Item>

        {/* <Form.Item
          name="property"
          label="Trường dữ liệu"
          rules={[{ type: 'string', required: !isDetails }]}
        >
          <Input disabled={isDetails} placeholder="Nhập tên trường dữ liệu" />
        </Form.Item> */}

        <Form.Item name="description" label="Mô tả">
          <Input disabled={isDetails} placeholder="Nhập mô tả nhãn" />
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

export default LabelForm;
