import React, { useCallback, useEffect, useState, useMemo, useRef } from 'react';
import { Card, Select, Modal, Spin, Button } from 'antd';
import Axios from 'axios';

import ReportTemplate from './ReportTemplate';

const { Option } = Select;

const role = 'MANAGER';
// const role = 'USER';

const processDataToAPI = (report) => {
  return {
    ...report,
    reviewerId: 4,
    name: `[BÁO CÁO] ${report.type}`,
    sections: report.sections.map((section) => {
      const { uniqueId, ...rest } = section;
      return ({
        ...rest,
      });
    })
  }
}

export default function CreateReport() {
  const [report, setReport] = useState(null);
  const [currentTemplateId, setCurrentTemplateId] = useState(null);
  const [templatesList, setTemplatesList] = useState([]);

  useEffect(() => {
    Axios.get('https://dsd07.herokuapp.com/api/reports/templates', {
      headers: {
        'Access-Control-Allow-Origin': true,
      },
    })
      .then(response => {
        if (response.data.success)
          setTemplatesList(response.data.data)
      }).catch(err => {
        // handleShowModal()
      });
  }, []);

  const handleChangeOption = useCallback((id) => {
    setCurrentTemplateId(id);
    setReport(null);
  }, []);

  const handleSubmitReport = useCallback(() => {
    Axios.post('https://dsd07.herokuapp.com/api/user-reports', processDataToAPI(report), {
      headers: {
        'Access-Control-Allow-Origin': true,
        'api-token': '4e3fe3463afd3a705c0be7ec2322c335',
        'project-type': 'LUOI_DIEN',
      },
    })
      .then(response => {
      }).catch(err => {
        // handleShowModal()
      });
  }, [report]);

  const renderTemplateDropdownList = useCallback(() => templatesList.map((templateItem) => {
    return (
      <Option
        key={templateItem.id}
        value={templateItem.id}
      >
        {templateItem.type}
      </Option>
    );
  }), [templatesList]);

  if (templatesList.length === 0) {
    return <Spin size="large" />;
  }

  return (
    <div>
      <Card
        className="u-shadow u-rounded"
        style={{ marginBottom: 16 }}
      >
        <div>
          <span style={{ fontWeight: 'bold', marginRight: 8 }}>Chọn mẫu báo cáo</span>
          <Select
            style={{ marginRight: 16, width: '40%' }}
            onChange={handleChangeOption}
          >
            {renderTemplateDropdownList()}
          </Select>
          <Button
            type="primary"
            disabled={!currentTemplateId || !report}
            onClick={handleSubmitReport}
          >
            Tạo báo cáo
          </Button>
        </div>
      </Card>
      {currentTemplateId && (
        <ReportTemplate
          currentTemplateId={currentTemplateId}
          setReport={setReport}
        />
      )}
    </div>
  );
}
