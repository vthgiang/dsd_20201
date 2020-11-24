import React from 'react';
import { notification } from 'antd';

import ParamForm from '../ParamForm';
import { omitIsNil } from '../../../../utils/omit';
import { addParamApi } from '../../../../apis/param';

const AddParam = ({ visible, hideModal, addParam }) => {
  const onAddParam = async ({ name, description, property }) => {
    let paramData = omitIsNil(
      {
        name,
        property,
        description,
        isDefault: true,
      },
      { deep: false },
    );
    try {
      const resp = await addParamApi(paramData);

      if (!resp || !resp.status || !resp.result) throw new Error('Máy chủ lỗi');

      const { result: newParam } = resp;
      addParam(newParam);

      notification.success({
        message: 'Thêm tham số thành công',
      });
    } catch (error) {
      notification.error({
        message: 'Máy chủ lỗi, vui lòng thử lại sau',
      });
    }
  };

  return (
    <ParamForm
      title="Thêm tham số"
      okText="Thêm"
      cancelText="Hủy"
      onOk={onAddParam}
      onCancel={hideModal}
      visible={visible}
    />
  );
};

export default AddParam;
