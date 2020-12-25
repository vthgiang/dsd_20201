import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Input } from 'antd';

import { getFormatTagName, getFormatClassNames } from './utils';
import Inputify from './Inputify';
import matchInputs from './Inputify/utils/matchInputs';

export default function TextKeySection({
  section,
  onSectionChange,
  formatted,
}) {
  const [inputValues, setInputValues] = useState({});
  const Tag = getFormatTagName(section.format);
  const classNames = getFormatClassNames(section.format);
  const inputs = useMemo(() => matchInputs(section.text), [section.text]);

  const onInputChange = useCallback((e) => {
    const { target: { value, name } } = e;
    setInputValues((inputValues) => ({
      ...inputValues,
      [name]: value,
    }));
  }, []);

  const componentDecorator = useCallback((decoratedInput, key) => (
    <Input
      name={decoratedInput}
      style={{ width: 80 }}
      onChange={onInputChange}
    />
  ), [onInputChange]);

  const componentFormattedDecorator = useCallback((decoratedInput, key) => {
    const formattedText = Object.keys(section.keys).reduce((finalString, currentKey) => {
      if (decoratedInput === `$${currentKey}`) {
        return section.keys[currentKey];
      }
    }, decoratedInput);
    return formattedText;
  }, [section]);

  useEffect(() => {
    if (inputs?.length > 0) {
      setInputValues(inputs.reduce((finalResult, currentInput) => ({
        ...finalResult,
        [currentInput.input]: null,
      }), {}));
    }
  }, [inputs]);

  useEffect(() => {
    onSectionChange && onSectionChange({
      uniqueId: section.uniqueId,
      keys: inputValues,
    });
  }, [inputValues, section.uniqueId]);

  return (
    <Tag
      className={classNames}
    >
      <Inputify
        matchDecorator={() => inputs}
        componentDecorator={formatted ? componentFormattedDecorator : componentDecorator}
      >
        {section.text}
      </Inputify>
    </Tag>
  );
}
