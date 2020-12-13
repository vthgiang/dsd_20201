import React, { useEffect, useState, useCallback } from 'react';
import { Card, Spin } from 'antd';
import Axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { TemplateSectionType } from '../../../constants/report';
import PredefinedSection from './PredefinedSection';
import TextSection from './TextSection';
import TextKeySection from './TextKeySection';
import TableSection from './TableSection';

const processDataFromAPI = (data) => {
  if (data.sections && Array.isArray(data.sections)) {
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
  }, [currentTemplate]);

  const renderSection = (section) => {
    if (!section?.type) return null;
    switch (section.type) {
      case TemplateSectionType.PREDEFINED_SECTION: {
        return (
          <PredefinedSection
            section={section}
            onSectionChange={onSectionChange}
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
            onSectionChange={onSectionChange}
          />
        );
      }
      case TemplateSectionType.TABLE: {
        return (
          <TableSection
            section={section}
            onSectionChange={onSectionChange}
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
      {!currentTemplate && <Spin size="large" />}
      {currentTemplate?.sections && (
        <div className="u-reportContainer">
          {currentTemplate.sections.map((section) => renderSection(section))}
        </div>
      )}
    </Card>
  );
}
