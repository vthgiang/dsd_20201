import React from 'react';

import { TemplateSectionType } from '../../../constants/report';
import PredefinedSection from './PredefinedSection';
import TextSection from './TextSection';
import TextKeySection from './TextKeySection';
import TableSection from './TableSection';

export default function ReportRenderer({
  sections,
  formatted,
  onSectionChange,
}) {
  const renderSection = (section) => {
    if (!section?.type) return null;
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
          />
        );
      }
      case TemplateSectionType.TABLE: {
        return (
          <TableSection
            section={section}
            formatted={formatted}
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
    <div className="u-reportContainer">
      {sections.map((section) => renderSection(section))}
    </div>
  );
}