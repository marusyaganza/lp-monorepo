import React, { useEffect } from 'react';
import { useSelect, Checkbox, cn } from '@lp/ui';
import styles from './SortControls.module.css';
import { SortBy, SortWordsBy } from '../../generated/graphql';

export type SortByType = (SortWordsBy & SortBy) | string;

export interface SortControlsProps {
  blankOption: string;
  blankValue?: string;
  sortBy: SortByType;
  label?: string;
  initialSortValue?: string;
  initialOrderValue: boolean;
  onSortChange: (value: SortByType) => void;
  onOrderChange: (value: boolean) => void;
  options: Record<SortByType, string>;
  className?: string;
}

export const SortControls = ({
  blankOption,
  onSortChange,
  sortBy,
  options,
  initialOrderValue,
  onOrderChange,
  className,
  blankValue,
  label
}: SortControlsProps) => {
  const { Select, Option, setValue } = useSelect<string>({
    onChange: onSortChange,
    initialValue: sortBy
  });

  const renderValue = (val?: string) => {
    if (!val) {
      return '';
    }
    return options?.[val] ? options[val] : blankValue || 'Select words by';
  };

  useEffect(() => {
    if (sortBy) {
      setValue(sortBy);
    }
  }, [sortBy, setValue]);

  const optValues = Object.keys(options);

  return (
    <div data-cy="sortControls" className={cn(styles.orderControls, className)}>
      <Select
        className={styles.select}
        value={sortBy}
        renderValue={renderValue}
        variant="withIcon"
        label={label}
      >
        <Option value="" key={blankOption}>
          {blankOption}
        </Option>
        {optValues.map(opt => (
          <Option key={opt} value={opt}>
            {options[opt]}
          </Option>
        ))}
      </Select>
      <Checkbox
        onChange={onOrderChange}
        initialValue={initialOrderValue}
        variant="withIcon"
        iconId={initialOrderValue ? 'asc' : 'desc'}
      />
    </div>
  );
};
