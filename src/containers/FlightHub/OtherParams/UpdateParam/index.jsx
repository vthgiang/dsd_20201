import React from 'react';

import { notification } from 'antd';
import ParamForm from '../ParamForm';
import { omitIsNil } from '../../../../utils/omit';
import { updateParamApi } from '../../../../apis/param';

const UpdateParam = ({ visible, hideModal, paramDetails, updateParam }) => {
  const onUpdateParam = async ({ name, description, property }) => {
    const paramData = omitIsNil(
      {
        id: paramDetails.id || '',
        name,
        description,
        property,
      },
      { deep: false },
    );
    try {
      const resp = await updateParamApi(paramData);

      if (!resp || !resp.status || !resp.result) throw new Error('Máy chủ lỗi');

      const { result: updatedParam } = resp;
      updateParam(updatedParam);

      notification.success({
        message: 'Cập nhật tham số thành công',
      });
    } catch (error) {
      notification.error({
        message: 'Máy chủ lỗi, vui lòng thử lại sau',
      });
    }
  };

  return (
    <ParamForm
      title="Cập nhật tham số"
      okText="Cập nhật"
      cancelText="Hủy"
      onOk={onUpdateParam}
      onCancel={hideModal}
      visible={visible}
      initialValues={paramDetails}
    />
  );
};

export default UpdateParam;
