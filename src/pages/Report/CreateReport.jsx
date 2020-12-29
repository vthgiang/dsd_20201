import React, { useCallback, useEffect, useState, useMemo, useRef } from 'react';
import { Card, Select, Modal, Spin, Button } from 'antd';
import Axios from 'axios';
import { useLocation } from 'react-router-dom';
import QueryString from 'query-string';
import { useSelector } from "react-redux";

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
  const { user: { api_token, type } } = useSelector(state => state.user);
  const [report, setReport] = useState(null);
  const [currentTemplateId, setCurrentTemplateId] = useState(null);
  const [templatesList, setTemplatesList] = useState([]);
  const location = useLocation();
  const { templateId } = QueryString.parse(location.search);

  const handleChangeOption = useCallback((id) => {
    setCurrentTemplateId(id);
    setReport(null);
  }, []);

  useEffect(() => {
    Axios.get('https://dsd07.herokuapp.com/api/reports/templates', {
      headers: {
        'Access-Control-Allow-Origin': true,
        "api-token": api_token,
        "project-type": type,
      },
    })
      .then(response => {
        if (response.data.success) {
          const templates = response.data.data;
          setTemplatesList(templates);
          if (templates.find((item) => item.id === templateId)) {
            handleChangeOption(templateId);
          }
        }
      }).catch(err => {
        // handleShowModal()
      });
  }, [templateId]);

  const handleSubmitReport = useCallback(() => {
    Axios.post('https://dsd07.herokuapp.com/api/user-reports', processDataToAPI(report), {
      headers: {
        'Access-Control-Allow-Origin': true,
        "api-token": api_token,
        "project-type": type,
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
            value={currentTemplateId}
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
