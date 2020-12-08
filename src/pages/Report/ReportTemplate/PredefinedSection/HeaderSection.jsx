import React, { useState, useCallback, useEffect } from 'react';
import { Row, Col, Input } from 'antd';

export default function HeaderSection({
  section,
  onSectionChange,
  formatted,
}) {
  const [inputValues, setInputValues] = useState({
    company_name: null,
    doc_number: null,
    city: null,
    date: null,
    month: null,
    year: null,
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
        <Col span={8}>
          <h3 style={{ textTransform: 'uppercase' }} className="u-fontBold">
            {formatted ? (
              section?.keys['company_name']
            ) : (
              <Input
                name="company_name"
                onChange={onInputChange}
                style={{ width: 250, textTransform: 'uppercase' }}
                placeholder="Tên công ty"
                className="u-fontBold"
              />
            )}
          </h3>
          <div className="u-fontBold">------------------</div>
          <div style={{ marginTop: '10px' }}>
            <span>Số</span>
            &nbsp;
            {formatted ? (
              section?.keys['doc_number']
            ) : (
              <Input
                name="doc_number"
                onChange={onInputChange}
                style={{ width: 100 }}
              />
            )}
          </div>
        </Col>
        <Col span={16}>
          <h3 className="u-fontBold">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h3>
          <h3 className="u-fontBold">Độc lập - Tự do - Hạnh phúc</h3>
          <div style={{ fontStyle: 'italic' }}>
            {formatted ? (
              section?.keys['city']
            ) : (
              <Input
                name="city"
                onChange={onInputChange}
                style={{ width: 80 }}
                placeholder="Thành phố"
              />
            )}
            <span>, ngày</span>
            &nbsp;
            {formatted ? (
              section?.keys['date']
            ) : (
              <Input
                name="date"
                onChange={onInputChange}
                style={{ width: 40 }}
              />
            )}
            &nbsp;
            <span>tháng</span>
            &nbsp;
            {formatted ? (
              section?.keys['month']
            ) : (
              <Input
                name="month"
                onChange={onInputChange}
                style={{ width: 40 }}
              />
            )}
            &nbsp;
            <span>năm</span>
            &nbsp;
            {formatted ? (
              section?.keys['year']
            ) : (
              <Input
                name="year"
                onChange={onInputChange}
                style={{ width: 60 }}
              />
            )}
            </div>
        </Col>
      </Row>
    </div >
  );
}
