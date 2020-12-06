import React, { useEffect, useState, useCallback } from 'react';
import { Card, Spin } from 'antd';
import Axios from 'axios';

import { TemplateSectionType } from '../../../constants/report';
import PredefinedSection from './PredefinedSection';
import TextSection from './TextSection';
import TextKeySection from './TextKeySection';
import TableSection from './TableSection';

export default function ReportViewer({
  reportId,
}) {
  const [currentReport, setCurrentReport] = useState(null);

  useEffect(() => {
    setCurrentReport(null);
    Axios.get(`https://dsd07.herokuapp.com/api/user-reports/${reportId}`, {
      headers: {
        'Access-Control-Allow-Origin': true,
        'api-token': '4e3fe3463afd3a705c0be7ec2322c335',
        'project-type': 'LUOI_DIEN',
      },
    })
      .then(response => {
        if (response.data.success) {
          setCurrentReport(response.data.data)
        }
      }).catch(err => {
        console.error(err);
      });
  }, [reportId]);

  const renderSection = (section) => {
    if (!section?.type) return null;
    switch (section.type) {
      case TemplateSectionType.PREDEFINED_SECTION: {
        return (
          <PredefinedSection
            section={section}
            formatted={true}
          />
        );
      }
      case TemplateSectionType.TEXT: {
        return (
          <TextSection
            section={section}
          />
        );
      }
      case TemplateSectionType.TEXT_KEY: {
        return (
          <TextKeySection
            section={section}
            formatted={true}
          />
        );
      }
      case TemplateSectionType.TABLE: {
        return (
          <TableSection
            section={section}
            formatted={true}
          />
        );
      }
      default: {
        return null;
      }
    }
  };

  return (
    <Card className="u-shadow u-rounded u-reportCard">
      {!currentReport && <Spin size="large" />}
      {currentReport && (
        <h1>Bạn đang xem báo cáo: <span>{`${currentReport.name}`}</span></h1>
      )}
      {currentReport?.sections && (
        <div className="u-reportContainer">
          {currentReport.sections.map((section) => renderSection(section))}
        </div>
      )}
    </Card>
  );
}
