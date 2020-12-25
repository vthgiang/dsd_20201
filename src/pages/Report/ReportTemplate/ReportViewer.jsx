import React, { useEffect, useState } from 'react';
import { Card, Spin } from 'antd';
import Axios from 'axios';

import ReportRenderer from './ReportRenderer';

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

  return (
    <Card className="u-shadow u-rounded u-reportCard">
      {!currentReport && <Spin size="large" />}
      {currentReport && (
        <h3>Bạn đang xem báo cáo: <span>{`${currentReport.name}`}</span></h3>
      )}
      {currentReport?.sections && (
        <ReportRenderer
          sections={currentReport.sections}
          formatted={true}
        />
      )}
    </Card>
  );
}
