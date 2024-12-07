import React, { useContext, useEffect, useState } from 'react';
import { Tense, Game, VerbsQuery } from '../../../generated/graphql';
import logo from '../../../assets/img/conjugate-logo.svg';
import { PageLayout } from '../../../components/PageLayout/PageLayout';
import { useSelect, Button, VerbSelector } from '@lp/ui';
import styles from './ConjugatePage.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { routes } from '../../../constants/routes';
import { useQuery } from '@apollo/client';
import { VERBS_QUERY } from '../../../gql/queries';
import { AppContext } from '../../../app-context/appContext';

// Uncomment more tenses as needed
export const TENSES: Record<Tense, string> = {
  cond: 'Condicional',
  futr: 'Futuro indicativo',
  impf: 'Imperativo',
  pind: 'Presente indicativo',
  psub: 'Presente subjentivo',
  pret: 'Pretérito imperfecto',
  pprf: 'Pretérito perfecto simple'
  // gppt: 'Gerundio'
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
  const [wordId, setWordId] = useState<string>();
  const [wordSelectionOpen, setWordSelectionOpen] = useState(false);
  const { data, loading, error } = useQuery<VerbsQuery>(VERBS_QUERY);
  const { setNotification } = useContext(AppContext);

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

  useEffect(() => {
    if (error) {
      setNotification({
        variant: 'error',
        text: 'Error',
        subText: error?.message || 'something went wrong'
      });
    }
  }, [error]);

  const renderSelectValue = () => {
    return TENSES[tense];
  };

  const handleButtonClick = () => {
    navigate(`/${routes.games}/${Game.Conjugation.toLocaleLowerCase()}`, {
      state: { ...state, tense, wordId }
    });
  };

  const handleVerbSubmit = (val: string) => {
    setWordId(val);
    setWordSelectionOpen(false);
  };

  if (wordSelectionOpen && data?.verbs?.length) {
    const { verbs } = data;

    return (
      <PageLayout className={styles.verbSelectorContainer} isLoading={loading}>
        <VerbSelector
          options={verbs}
          onSubmit={handleVerbSubmit}
          onCancel={() => {
            setWordSelectionOpen(false);
          }}
        />
      </PageLayout>
    );
  }
  return (
    <PageLayout>
      <article className={styles.content}>
        <h1 className={styles.heading}>Welcome to conjugation training!</h1>
        <img width={225} height={200} src={logo} alt="" />
        <Button
          variant="tertiary"
          onClick={() => {
            setWordSelectionOpen(true);
          }}
        >
          Pick a word to practice
        </Button>
        <p>Please select tense</p>
        <Select
          dataCy="tense-selector"
          className={styles.select}
          variant="withIcon"
          renderValue={renderSelectValue}
          label="Tense"
        >
          {renderOptions()}
        </Select>
        <Button data-cy="conjugate-btn" onClick={handleButtonClick}>
          Continue
        </Button>
      </article>
    </PageLayout>
  );
};

export default ConjugatePage;
