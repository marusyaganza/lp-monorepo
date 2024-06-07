import React from 'react';
import { useSelect } from '../Select/useSelect';
import { Level } from '../../generated/graphql';
import styles from './LevelSelector.module.css';

export interface LevelSelectorProps {
  onChange: (level: Level) => void;
  initialValue?: Level;
}

export const LevelSelector = ({
  onChange,
  initialValue
}: LevelSelectorProps) => {
  const renderCurrentValue = (level?: Level) => {
    if (!level) {
      return;
    }
    return <span className={styles.level}>{level} </span>;
  };
  const { Select, Option } = useSelect<Level>({ onChange, initialValue });

  const levels = Object.keys(Level) as Level[];

  return (
    <Select
      dataCy="levelSelector"
      value={initialValue}
      renderValue={renderCurrentValue}
    >
      {levels.map(level => {
        return (
          <Option key={level} value={level}>
            {level}
          </Option>
        );
      })}
    </Select>
  );
};
