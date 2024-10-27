import React, { useMemo } from 'react';
import { cn } from '../../utils/classnames';

import styles from './TagSelector.module.css';
import { WordTag } from '../../generated/graphql';
import { useSelect } from '../Select/useSelect';
import { Tag } from '../Tag/Tag';
import { Button } from '../Button/Button';
import { TagType } from '../../@types/types';

export interface TagSelectorProps {
  /**TagSelector prop */
  tags?: TagType[];
  onChange: (val: string[]) => void;
  value?: string[];
  label?: string;
  showNoTagsTag?: boolean;
  /**additional styling */
  className?: string;
}

const NO_TAGS_TAG: TagType = {
  color: '#F7F7F7',
  text: 'without tags',
  id: '000000000000000000000000',
  desc: 'select words that have no tags'
};

/**Component description goes here */
export const TagSelector = ({
  tags: initialTags = [],
  value = [],
  className,
  onChange,
  label,
  showNoTagsTag
}: TagSelectorProps) => {
  const handleChange = (val: string) => {
    const values = [...value, val];
    onChange(values);
  };

  const tags = useMemo(() => {
    if (showNoTagsTag) {
      return [...initialTags, NO_TAGS_TAG];
    }
    return initialTags;
  }, [initialTags, showNoTagsTag]);

  const { Select, Option } = useSelect<string>({
    onChange: handleChange,
    isMultiselect: true
  });

  const getTagRemoveHandler = (tagId: string) => {
    return function removeTag() {
      const newValues = value.filter(value => value !== tagId);
      onChange(newValues);
    };
  };

  const renderOption = (tag: TagType) => {
    return (
      <Option key={tag.id} value={tag.id} className={styles.option}>
        <span>{tag.text}</span>
      </Option>
    );
  };

  const renderOptions = () => {
    const options = tags?.filter(tag => !value.includes(tag.id));
    if (!options) {
      return;
    }
    return options
      .sort((a, b) => a.text.localeCompare(b.text))
      .map(option => renderOption(option));
  };

  const renderCurrentValue = () => {
    const currentTags = tags?.filter(tag => value.includes(tag.id));
    return (
      <ul className={styles.tags}>
        {currentTags?.map(tag => {
          const { text, color, id } = tag as WordTag;
          if (!text || !color || !id) {
            return;
          }
          return (
            <li key={id}>
              <Tag
                color={color}
                text={text}
                className={styles.tag}
                iconId={tag.id === NO_TAGS_TAG.id ? 'void' : undefined}
              >
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
