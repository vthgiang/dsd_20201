import React, { useState, useCallback, useEffect } from 'react';
import { Row, Col, Input } from 'antd';

export default function FooterSection({
  section,
  onSectionChange,
  formatted,
}) {
  const [inputValues, setInputValues] = useState({
    author: null,
    reviewer: null,
  });

  const onInputChange = useCallback((e) => {
    const { target: { value, name } } = e;
    setInputValues((inputValues) => ({
      ...inputValues,
      [name]: value,
    }));
  }, []);

  useEffect(() => {
    onSectionChange && onSectionChange({
      uniqueId: section.uniqueId,
      keys: inputValues,
    });
  }, [inputValues, section.uniqueId]);

  return (
    <div
      style={{ display: ' flex', flexDirection: 'column', marginBottom: 32 }}
      className="u-textCenter"
    >
      <Row style={{ flexDirection: 'row', display: ' flex', justifyContent: 'space-between' }}>
        <Col span={10}>
          <h3 className="u-fontBold">
            Người phê duyệt
          </h3>
          <div style={{ marginTop: 100 }}>
            {formatted ? (
              section?.keys['reviewer']
            ) : (
              <Input
                name="reviewer"
                onChange={onInputChange}
                style={{ width: 200, textTransform: 'uppercase' }}
                className="u-fontBold"
              />
            )}
          </div>
        </Col>
        <Col span={4} />
        <Col span={10}>
          <h3 className="u-fontBold">
            Người lập báo cáo
          </h3>
          <div style={{ marginTop: 100 }}>
            {formatted ? (
              section?.keys['author']
            ) : (
              <Input
                name="author"
                onChange={onInputChange}
                style={{ width: 200, textTransform: 'uppercase' }}
                className="u-fontBold"
              />
            )}
          </div>
        </Col>
      </Row>
    </div >
  );
}
