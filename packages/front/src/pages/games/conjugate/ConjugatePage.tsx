import React, { useState } from 'react';
import { Tense, Game } from '../../../generated/graphql';
import logo from '../../../assets/img/conjugate-logo.svg';
import { PageLayout } from '../../../components/PageLayout/PageLayout';
import { useSelect, Button } from '@lp/ui';
import styles from './ConjugatePage.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { routes } from '../../../constants/routes';

// Uncomment more tenses as needed
export const TENSES: Record<Tense, string> = {
  pind: 'Presente indicativo',
  pprf: 'Pretérito perfecto simple',
  impf: 'Imperativo',
  pret: 'Pretérito imperfecto'
  //   futr: 'Futuro indicativo',
  //   cond: 'Condicional',
  //   psub: 'Presente subjentivo',
  //   pisb1: 'Pretérito imperfecto',
  //   pisb2: 'Pretérito imperfecto 2',
  //   fsub: 'Futuro',
  //   ppci: 'Pretérito perfecto compuesto',
  //   ppsi: 'Pretérito pluscuamperfecto',
  //   pant: 'Pretérito anterior',
  //   fpin: 'Futuro perfecto',
  //   cpef: 'Condicional perfecto',
  //   ppfs: 'Pretérito perfecto',
  //   ppss1: 'Pretérito pluscuamperfecto',
  //   ppss2: 'Pretérito pluscuamperfecto 2',
  //   fpsb: 'Futuro perfecto',
};

const ConjugatePage = () => {
  const [tense, setTense] = useState<Tense>(Tense.Pind);
  const navigate = useNavigate();
  const handleChange = (val: Tense) => {
    setTense(val);
  };
  const location = useLocation();
  const { state } = location;

  const { Select, Option } = useSelect<Tense>({ onChange: handleChange });
  const renderOptions = () => {
    const keys = Object.keys(TENSES) as Tense[];
    return keys.map(key => {
      return (
        <Option key={key} value={key}>
          {TENSES[key]}
        </Option>
      );
    });
  };
  const renderSelectValue = () => {
    return TENSES[tense];
  };
  const handleButtonClick = () => {
    navigate(`/${routes.games}/${Game.Conjugation.toLocaleLowerCase()}`, {
      state: { ...state, tense }
    });
  };
  return (
    <PageLayout>
      <article className={styles.content}>
        <h1 className={styles.heading}>Welcome to conjugation training!</h1>
        <img width={300} height={266} src={logo} alt="" />
        <p>Please select tense</p>
        <Select
          className={styles.select}
          variant="withIcon"
          renderValue={renderSelectValue}
          label="Tense"
        >
          {renderOptions()}
        </Select>
        <Button onClick={handleButtonClick}>Continue</Button>
      </article>
    </PageLayout>
  );
};

export default ConjugatePage;
