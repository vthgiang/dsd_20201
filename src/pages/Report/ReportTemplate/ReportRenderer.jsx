import React, { useCallback } from 'react';

import { TemplateSectionType } from '../../../constants/report';
import PredefinedSection from './PredefinedSection';
import TextSection from './TextSection';
import TextKeySection from './TextKeySection';
import TableSection from './TableSection';

export default function ReportRenderer({
  sections,
  formatted,
  onSectionChange,
  dataSources,
}) {
  const getDataSource = (section) => {
    if (section.dataSource) {
      const dataSourceType = section.dataSource.split('.')[0];
      if (dataSourceType && dataSources && dataSources[dataSourceType]) {
        return dataSources[dataSourceType];
      }
    }
    return null;
  };

  const renderSection = (section) => {
    if (!section?.type) return null;
    const dataSource = getDataSource(section);
    switch (section.type) {
      case TemplateSectionType.PREDEFINED_SECTION: {
        return (
          <PredefinedSection
            section={section}
            formatted={formatted}
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
            formatted={formatted}
            onSectionChange={onSectionChange}
            dataSource={dataSource}
          />
        );
      }
      case TemplateSectionType.TABLE: {
        return (
          <TableSection
            section={section}
            formatted={formatted}
            onSectionChange={onSectionChange}
            dataSource={dataSource}
          />
        );
      }
      default: {
        return null;
      }
    }
  };
  return (
    <div className="u-reportContainer">
      {sections.map((section) => renderSection(section))}
    </div>
  );
}