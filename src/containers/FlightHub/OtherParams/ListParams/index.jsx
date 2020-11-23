import React, { useEffect, useState } from 'react';
import { Col, Input, Row, Table, Modal, notification, Button } from 'antd';

import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import StyleListParams, { StyledTable } from './index.style';
import AddParam from '../AddParam';
import UpdateParam from '../UpdateParam';

import { deleteParamApi, getListParamsApi } from '../../../../apis/param';

const { Search } = Input;

const ListParams = () => {
  const [modalCreateVisible, setModalCreateVisible] = useState(false);
  const [modalUpdateVisible, setModalUpdateVisible] = useState(false);
  const [paramUpdateData, setParamUpdateData] = useState();
  const [listParams, setListParams] = useState();

  useEffect(() => {
    if (listParams) return;
    const fetchListParams = async () => {
      try {
        const resp = await getListParamsApi();
        if (
          !resp ||
          !resp.status ||
          !resp.result ||
          !Array.isArray(resp.result)
        ) {
          throw new Error('Máy chủ lỗi');
        }

        setListParams(resp.result);
      } catch (error) {
        notification.error({
          message: 'Máy chủ lỗi, vui lòng thử lại sau',
        });
      }
    };
    fetchListParams();
  }, [listParams]);

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
    setParamUpdateData(record);
    setModalUpdateVisible(true);
  };

  const hideModalUpdate = () => {
    setModalUpdateVisible(false);
  };

  const addParam = (param) => {
    setListParams([param, ...listParams]);
    hideModalCreate();
  };

  const updateParam = (param) => {
    const { id } = param;
    const updatedListParams = listParams.map((element) =>
      element.id === id ? param : element,
    );

    setListParams(updatedListParams);
    hideModalUpdate();
  };

  const handleDeleteParam = (id) => async () => {
    try {
      const resp = await deleteParamApi(id);

      if (!resp || !resp.status) throw new Error('Máy chủ lỗi');

      const newListParams = listParams.filter((param) => {
        const { id = '' } = param;
        return id !== id;
      });

      setListParams(newListParams);

      notification.success({
        message: 'Xóa tham số thành công',
      });
    } catch (error) {
      notification.error({
        message: 'Máy chủ lỗi, vui lòng thử lại sau',
      });
    }
  };

  const deleteConfirm = (item) => {
    const { id, name } = item;

    Modal.confirm({
      title: 'Cảnh báo',
      icon: <ExclamationCircleOutlined />,
      content: (
        <span>
          Bạn có muốn xóa tham số <strong>{name}</strong> không?
        </span>
      ),
      okText: 'Xóa',
      cancelText: 'Hủy',
      onOk: handleDeleteParam(id),
    });
  };

  const columns = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Tên tham số',
      width: '10%',
    },
    {
      key: 'description',
      dataIndex: 'description',
      title: 'Mô tả',
      width: '20%',
    },
    {
      key: 'mappingField',
      dataIndex: 'mappingField',
      title: 'Mapping Field',
      width: '10%',
    },
    {
      key: 'createdAt',
      dataIndex: 'createdAt',
      title: 'Ngày tạo',
      width: '20%',
    },
    {
      key: 'updatedAt',
      dataIndex: 'updatedAt',
      title: 'Ngày cập nhật',
      width: '20%',
    },
    {
      key: 'actions',
      title: 'Hành động',
      width: 'auto',
      align: 'center',
      render: (data, record) => {
        return (
          <Row type="flex" justify="center" align="middle">
            <Button
              icon={<EditOutlined />}
              size="small"
              onClick={showModalUpdate(record)}
            >
              Cập nhật
            </Button>
            &ensp;
            <Button
              icon={<DeleteOutlined />}
              danger
              size="small"
              onClick={() => deleteConfirm(record)}
            >
              Xóa
            </Button>
          </Row>
        );
      },
    },
  ];

  return (
    <StyleListParams>
      <AddParam
        visible={modalCreateVisible}
        hideModal={hideModalCreate}
        addParam={addParam}
      />

      <UpdateParam
        visible={modalUpdateVisible}
        hideModal={hideModalUpdate}
        paramDetails={paramUpdateData}
        updateParam={updateParam}
      />

      <h3>Danh sách tham số</h3>

      <Row type="flex" justify="space-between" align="middle">
        <Col span={8}>
          <Search
            placeholder="Tên tham số"
            onSearch={handleSearch}
            enterButton
          />
        </Col>
        <Button icon={<PlusOutlined />} onClick={showModalCreate}>
          Thêm tham số
        </Button>
      </Row>

      <StyledTable>
        <Table columns={columns} dataSource={listParams} />
      </StyledTable>
    </StyleListParams>
  );
};

export default ListParams;
