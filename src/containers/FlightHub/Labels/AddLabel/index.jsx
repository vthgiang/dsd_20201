import React from 'react';
import { notification } from 'antd';

import LabelForm from '../LabelForm';
import { omitIsNil } from '../../../../utils/omit';
import { addLabelApi } from '../../../../apis/label';

const AddLabel = ({ visible, hideModal, addLabel }) => {
  const onAddLabel = async ({ name, description, property }) => {
    let labelData = omitIsNil(
      {
        name,
        // property,
        description,
        isDefault: true,
      },
      { deep: false },
    );
    try {
      const resp = await addLabelApi(labelData);

      if (!resp || !resp.status || !resp.result) throw new Error('Máy chủ lỗi');

      const { result: newLabel } = resp;
      addLabel(newLabel);

      notification.success({
        message: 'Thêm nhãn thành công',
      });
    } catch (error) {
      notification.error({
        message: 'Máy chủ lỗi, vui lòng thử lại sau',
      });
    }
  };

  return (
    <LabelForm
      title="Thêm nhãn"
      okText="Thêm"
      cancelText="Hủy"
      onOk={onAddLabel}
      onCancel={hideModal}
      visible={visible}
    />
  );
};

export default AddLabel;
