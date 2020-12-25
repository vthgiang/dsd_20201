import React from 'react';
import { getFormatTagName, getFormatClassNames } from './utils';

export default function TextSection({
  section,
}) {
  const Tag = getFormatTagName(section.format);
  const classNames = getFormatClassNames(section.format);
  return (
    <Tag className={classNames}>{section.text}</Tag>
  );
}
