import React, { useEffect, useState } from 'react';
import { Col, Input, Row, Table, Modal, notification, Button } from 'antd';
import moment from 'moment';

import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import StyleListLabels, { StyledTable } from './index.style';
import AddLabel from '../AddLabel';
import UpdateLabel from '../UpdateLabel';

import { deleteLabelApi, getListLabelsApi } from '../../../../apis/label';
import { formatMomentDateToDateTimeString } from '../../MonitorCampaign/services';

const { Search } = Input;

const ListLabels = () => {
  const [modalCreateVisible, setModalCreateVisible] = useState(false);
  const [modalUpdateVisible, setModalUpdateVisible] = useState(false);
  const [labelUpdateData, setLabelUpdateData] = useState();
  const [listLabels, setListLabels] = useState();

  useEffect(() => {
    if (listLabels) return;
    const fetchListLabels = async () => {
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

        setListLabels(resp.result);
      } catch (error) {
        notification.error({
          message: 'Máy chủ lỗi, vui lòng thử lại sau',
        });
      }
    };
    fetchListLabels();
  }, [listLabels]);

  const handleSearch = (value) => {
    console.log(value);
  };

  const showModalCreate = () => {
    setModalCreateVisible(true);
  };

  const hideModalCreate = () => {
    setModalCreateVisible(false);
  };

  const showModalUpdate = (record) => () => {
    setLabelUpdateData(record);
    setModalUpdateVisible(true);
  };

  const hideModalUpdate = () => {
    setModalUpdateVisible(false);
  };

  const addLabel = (label) => {
    setListLabels([label, ...listLabels]);
    hideModalCreate();
  };

  const updateLabel = (label) => {
    const { id } = label;
    const updatedListLabels = listLabels.map((element) =>
      element.id === id ? label : element,
    );

    setListLabels(updatedListLabels);
    hideModalUpdate();
  };

  const handleDeleteLabel = (labelId) => async () => {
    try {
      const resp = await deleteLabelApi(labelId);

      if (!resp || !resp.status) throw new Error('Máy chủ lỗi');

      const newListLabels = listLabels.filter((label) => {
        const { id = '' } = label;
        return labelId !== id;
      });

      setListLabels(newListLabels);

      notification.success({
        message: 'Xóa nhãn thành công',
      });
    } catch (error) {
      notification.error({
        message: 'Máy chủ lỗi, vui lòng thử lại sau',
      });
    }
  };

  const deleteConfirm = (item) => {
    const { _id, name } = item;

    Modal.confirm({
      title: 'Cảnh báo',
      icon: <ExclamationCircleOutlined />,
      content: (
        <span>
          Bạn có muốn xóa nhãn <strong>{name}</strong> không?
        </span>
      ),
      okText: 'Xóa',
      cancelText: 'Hủy',
      onOk: handleDeleteLabel(_id),
    });
  };

  const columns = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Tên nhãn',
      width: '15%',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },

    {
      key: 'description',
      dataIndex: 'description',
      title: 'Mô tả',
      width: '20%',
      sorter: (a, b) => a.description.localeCompare(b.description),
    },
    {
      key: 'createdAt',
      dataIndex: 'createdAt',
      title: 'Ngày tạo',
      width: '15%',
      render: formatMomentDateToDateTimeString,
      sorter: (a, b) => moment(a.startTime).diff(moment(b.startTime)),
    },
    {
      key: 'updatedAt',
      dataIndex: 'updatedAt',
      title: 'Ngày cập nhật',
      width: '15%',
      render: formatMomentDateToDateTimeString,
      sorter: (a, b) => moment(a.startTime).diff(moment(b.startTime)),
    },
    {
      key: 'actions',
      title: 'Hành động',
      width: 'auto',
      align: 'center',
      render: (data, record) => {
        return (
          <Row type="flex" gutter={[8, 8]} justify="center" align="middle">
            <Col>
              <Button
                icon={<EditOutlined />}
                size="small"
                onClick={showModalUpdate(record)}
              >
                Cập nhật
              </Button>
            </Col>
            <Col>
              <Button
                icon={<DeleteOutlined />}
                danger
                size="small"
                onClick={() => deleteConfirm(record)}
              >
                Xóa
              </Button>
            </Col>
          </Row>
        );
      },
    },
  ];

  return (
    <StyleListLabels>
      <AddLabel
        visible={modalCreateVisible}
        hideModal={hideModalCreate}
        addLabel={addLabel}
      />

      <UpdateLabel
        visible={modalUpdateVisible}
        hideModal={hideModalUpdate}
        labelDetails={labelUpdateData}
        updateLabel={updateLabel}
      />

      <h3>Danh sách nhãn</h3>

      <Row type="flex" justify="space-between" align="middle">
        <Col span={8}>
          <Search placeholder="Tên nhãn" onSearch={handleSearch} enterButton />
        </Col>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showModalCreate}
        >
          Thêm nhãn
        </Button>
      </Row>

      <StyledTable>
        <Table columns={columns} dataSource={listLabels} />
      </StyledTable>
    </StyleListLabels>
  );
};

export default ListLabels;
