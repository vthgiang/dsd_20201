import React, { useEffect, useState, useCallback } from 'react';
import { Card, Spin, Space } from 'antd';
import Axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import ReportRenderer from './ReportRenderer';
import {
  DataSourceInfo,
  DataSourceType,
} from '../ManageReportTemplate';

const processDataFromAPI = (data) => {
  if (data?.sections && Array.isArray(data.sections)) {
    return ({
      ...data,
      sections: data.sections.map((section) => {
        return ({
          ...section,
          uniqueId: uuidv4(),
        })
      })
    })
  }
}

export default function ReportTemplate({
  currentTemplateId,
  setReport,
}) {
  const [currentTemplate, setCurrentTemplate] = useState(null);
  const [dataSources, setDataSources] = useState(null);

  const onSectionChange = useCallback((changedSection) => {
    if (!changedSection?.uniqueId) {
      console.error('Missing uniqueId', changedSection);
      return;
    }
    setReport((report) => ({
      ...report,
      sections: report?.sections?.map((section) => {
        if (section.uniqueId !== changedSection.uniqueId) {
          return section;
        }
        return ({
          ...section,
          ...changedSection,
        });
      }),
    }));
  }, []);

  useEffect(() => {
    Axios.get(`https://dsd07.herokuapp.com/api/reports/templates/${currentTemplateId}`, {
      headers: {
        'Access-Control-Allow-Origin': true,
      },
    })
      .then(response => {
        if (response.data.success) {
          setCurrentTemplate(processDataFromAPI(response.data.data))
        }
      }).catch(err => {
        console.error(err);
      });
  }, [currentTemplateId]);

  useEffect(() => {
    setReport(currentTemplate);
    const fetchDataSources = async () => {
      if (!currentTemplate?.sections) return; 
      const dataSourceList = currentTemplate.sections.reduce((finalResult, currentItem) => {
        if (currentItem.dataSource) {
          const dataSourceType = currentItem.dataSource.split('.')[0];
          if (!finalResult.includes(dataSourceType)) {
            return [...finalResult, dataSourceType];
          }
        }
        return finalResult;
      }, []);
      if (!(dataSourceList && dataSourceList.length > 0)) {
        setDataSources({});
        return;
      }
      const newDataSources = await dataSourceList.reduce(async (finalResult, currentItem) => {
        if (DataSourceInfo[currentItem]?.service) {
          const response = await DataSourceInfo[currentItem].service();
          return {
            ...finalResult,
            [currentItem]: {
              data: response,
              info: DataSourceInfo[currentItem],
            },
          }
        }
        return finalResult;
      }, {});
      
      setDataSources(newDataSources);
    }
    fetchDataSources();
  }, [currentTemplate]);

  return (
    <Card className="u-shadow u-rounded u-reportCard">
      {!currentTemplate && <Spin size="large" />}
      {currentTemplate?.sections && dataSources === null && (
        <Space>
          <Spin size="large" />
          <span>Đang tải dữ liệu điền tự động ...</span>
        </Space>
      )}
      {currentTemplate?.sections && dataSources !== null && (
        <ReportRenderer
          sections={currentTemplate.sections}
          formatted={false}
          onSectionChange={onSectionChange}
          dataSources={dataSources}
        />
      )}
    </Card>
  );
}
