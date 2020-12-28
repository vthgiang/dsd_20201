import React from 'react';
import HeaderSection from './HeaderSection';
import FooterSection from './FooterSection';

export default function PredefinedSection({
  section,
  onSectionChange,
  formatted,
}) {
  if (!section.format) return null;

  if (section.format === 'header') return (
    <HeaderSection
      section={section}
      formatted={formatted}
      onSectionChange={onSectionChange}
    />
  );
  if (section.format === 'footer') return (
    <FooterSection
      section={section}
      formatted={formatted}
      onSectionChange={onSectionChange}
    />
  );

  return null;
}
