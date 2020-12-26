import { Modal, Button, Form, Input, Select, DatePicker, message } from 'antd';
import React, { useImperativeHandle, useState, useEffect } from 'react';
import to from 'await-to-js';
import incidentLevelService from '../../../services/group09/incidentLevelService';
import incidentService from '../../../services/group09/incidentService';
import moment from 'moment';
const CreateModel = React.forwardRef((props, ref) => {
  const [visible, setVisible] = React.useState(false);
  const [defaultValue, setDefaultValue] = React.useState({});
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [form] = Form.useForm();
  const [levels, setLevels] = useState([]);
  const types = [
    {
      code: '1',
      name: 'Lưới điện',
    },
    {
      code: '2',
      name: 'Cây trồng',
    },
    {
      code: '3',
      name: 'Đê điều',
    },
    {
      code: '4',
      name: 'Cháy rừng',
    },
  ];
  const showModal = () => {
    setVisible(true);
  };
  useEffect(() => {
    fetchLevels();
  }, []);

  const fetchLevels = async () => {
    let [error2, res = []] = await to(incidentLevelService().index());
    setLevels(res);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        let [error, res] = await to(
          incidentService().create({
            ...defaultValue,
            ...values,
            dueDate: moment(values.dueDate).format('YYYY-MM-DD'),
            images: [],
            videos: [],
            type: 'LUOI_DIEN',
          }),
        );
        if (error) message.error('Đã có lỗi xảy ra!');
        message.success('Sự cố đã được tạo mới!');
        setConfirmLoading(false);
        setVisible(false);
      })
      .catch((errorInfo) => {
        console.log('errorInfo', errorInfo);
        setConfirmLoading(false);
      });
  };

  useImperativeHandle(ref, () => ({
    show() {
      setVisible(true);
    },
    hide() {
      setVisible(false);
    },
    setDefaultValue(defaultValue = {}) {
      setDefaultValue(defaultValue);
    },
  }));

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Modal
        title="Title"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form layout="vertical" initialValues={{}} form={form} preserve={false}>
          <Form.Item
            label="Tên sự cố"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
          >
            <Input.TextArea rows={5} />
          </Form.Item>
          <Form.Item
            label="Mức độ"
            name="level"
            rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
          >
            <Select>
              {levels.map((item) => (
                <Select.Option value={item.code} key={item.code}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Loại sự cố"
            name="type"
            rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
          >
            <Select>
              {types.map((item) => (
                <Select.Option value={item.code} key={item.code}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="DatePicker"
            name="dueDate"
            rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Vị trí"
            name="location"
            rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});
export default CreateModel;
