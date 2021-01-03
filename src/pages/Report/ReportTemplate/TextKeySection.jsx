import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Input } from 'antd';

import { getFormatTagName, getFormatClassNames } from './utils';
import Inputify from './Inputify';
import matchInputs from './Inputify/utils/matchInputs';

export default function TextKeySection({
  section,
  onSectionChange,
  formatted,
  dataSource,
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

  const componentDecorator = useCallback((decoratedInput, key) => {
    return (
      <Input
        value={inputValues?.[decoratedInput]}
        name={decoratedInput}
        style={{ width: 80 }}
        onChange={onInputChange}
      />
    );
  }, [onInputChange, inputValues]);

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

  useEffect(() => {
    if (dataSource && dataSource.data) {
      setInputValues((inputValues) => {
        const newInputs = { ...inputValues };
        Object.keys(inputValues).map((key) => {
          const trimmedKey = key.slice(1);
          if (dataSource.data[trimmedKey] !== undefined) {
            newInputs[key] = dataSource.data[trimmedKey].toString();
          }
        });
        return newInputs;
      });
    }
  }, [dataSource]);

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
