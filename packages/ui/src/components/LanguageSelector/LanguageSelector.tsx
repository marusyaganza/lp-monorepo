import React from 'react';
import { cn } from '../../utils/classnames';
import { Language } from '../../generated/graphql';

import styles from './LanguageSelector.module.css';
import { useSelect } from '../Select/useSelect';
import spanishFlag from '../../assets/img/spanishFlag.png';
import usFlag from '../../assets/img/usFlag.png';

export interface LanguageSelectorProps {
  /**additional styling */
  className?: string;
  /** currently selected value */
  value?: Language;
  /** Select's component change handler */
  onChange: (value: Language) => void;
}

const languages = {
  [Language.English]: {
    value: Language.English,
    imgSrc: usFlag
  },
  [Language.Spanish]: {
    value: Language.Spanish,
    imgSrc: spanishFlag
  }
};

/**Select component with two options - English and Spanish */
export const LanguageSelector = ({
  className,
  onChange,
  value
}: LanguageSelectorProps) => {
  const [{ Select, Option }] = useSelect<Language>({ onChange });
  const renderOption = (lang: Language) => {
    return (
      <Option value={languages[lang].value} className={styles.option}>
        <img
          alt={`${lang} flag`}
          className={styles.image}
          src={languages[lang].imgSrc}
        />
        <span>{languages[lang].value.toLocaleLowerCase()}</span>
      </Option>
    );
  };
  const renderCurrentValue = (lang?: Language) => {
    if (!lang) {
      return;
    }
    return (
      <img
        alt={`${lang} flag`}
        className={styles.image}
        src={languages[lang]?.imgSrc}
      />
    );
  };

  return (
    <div className={cn(className, styles.container)}>
      <Select value={value} renderValue={renderCurrentValue} placement="right">
        {renderOption(Language.English)}
        {renderOption(Language.Spanish)}
      </Select>
    </div>
  );
};
