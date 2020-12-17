import React from 'react';

import { notification } from 'antd';
import LabelForm from '../LabelForm';
import { omitIsNil } from '../../../../utils/omit';
import { updateLabelApi } from '../../../../apis/label';

const UpdateLabel = ({ visible, hideModal, labelDetails, updateLabel }) => {
  const onUpdateLabel = async ({ name, description, property }) => {
    const labelData = omitIsNil(
      {
        _id: labelDetails._id || '',
        name,
        description,
        property,
      },
      { deep: false },
    );
    try {
      const resp = await updateLabelApi(labelData);

      if (!resp || !resp.status || !resp.result) throw new Error('Máy chủ lỗi');

      const { result: updatedLabel } = resp;
      updateLabel(updatedLabel);

      notification.success({
        message: 'Cập nhật nhãn thành công',
      });
    } catch (error) {
      notification.error({
        message: 'Máy chủ lỗi, vui lòng thử lại sau',
      });
    }
  };

  return (
    <LabelForm
      title="Cập nhật nhãn"
      okText="Cập nhật"
      cancelText="Hủy"
      onOk={onUpdateLabel}
      onCancel={hideModal}
      visible={visible}
      initialValues={labelDetails}
    />
  );
};

export default UpdateLabel;
