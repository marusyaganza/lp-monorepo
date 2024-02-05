import React, { useState, useEffect } from 'react';
import { cn } from '../../utils/classnames';

import styles from './TagSelector.module.css';
import { WordTag } from '../../generated/graphql';
import { useSelect } from '../Select/useSelect';
import { Tag } from '../Tag/Tag';
import { Button } from '../Button/Button';

export interface TagSelectorProps {
  /**TagSelector prop */
  tags?: WordTag[];
  /**additional styling */
  onChange: (val: string[]) => void;
  initialValue?: string[];
  label?: string;
  className?: string;
}
/**Component description goes here */
export const TagSelector = ({
  tags,
  initialValue,
  className,
  onChange,
  label
}: TagSelectorProps) => {
  const [currentValues, setCurrentValues] = useState(initialValue || []);

  const handleChange = (val: string) => {
    setCurrentValues(prev => [...prev, val]);
  };

  const { Select, Option } = useSelect<string>({
    onChange: handleChange
  });

  useEffect(() => {
    onChange(currentValues);
  }, [currentValues]);

  const getTagRemoveHandler = (tagId: string) => {
    return function removeTag() {
      const newValues = currentValues.filter(value => value !== tagId);
      setCurrentValues(newValues);
    };
  };

  const renderOption = (tag: WordTag) => {
    return (
      <Option key={tag.id} value={tag.id} className={styles.option}>
        <span>{tag.text}</span>
      </Option>
    );
  };

  const renderOptions = () => {
    const options = tags?.filter(tag => !currentValues.includes(tag.id));
    if (!options) {
      return;
    }
    return options.map(option => renderOption(option));
  };

  const renderCurrentValue = () => {
    const currentTags = tags?.filter(tag => currentValues.includes(tag.id));
    return (
      <ul className={styles.tags}>
        {currentTags?.map(tag => {
          const { text, color, id } = tag as WordTag;
          if (!text || !color || !id) {
            return;
          }
          return (
            <li key={id}>
              <Tag color={color} text={text} className={styles.tag}>
                <Button
                  className={styles.button}
                  variant="icon"
                  iconId="close"
                  onClick={getTagRemoveHandler(tag.id)}
                ></Button>
              </Tag>
            </li>
          );
        })}
      </ul>
    );
  };

  if (!tags) {
    return;
  }

  return (
    <div className={cn(className, styles.container)}>
      <Select
        label={label}
        placement="center"
        className={styles.select}
        variant="withIcon"
        renderValue={renderCurrentValue}
      >
        {renderOptions()}
      </Select>
    </div>
  );
};
