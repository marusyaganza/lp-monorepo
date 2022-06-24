import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Button } from '../../../../ui/src/components/button/Button';
import { FlipCard } from '../../../../ui/src/components/flip-card/FlipCard';
import { Form } from '../../../../ui/src/components/form/Form';
import { OptionBox } from '../../../../ui/src/components/option-box/option-box';
import { WordType, ConjugationType } from '../../../../types/common-types';

import { PageLayout } from '../../components/PageLayout/PageLayout';
import { IRREGULAR_SPANISH_VERBS } from '../../gql/queries';

import './ConjugationPage.css';

const ConjugationPage = () => {
  const { loading, error, data } = useQuery(IRREGULAR_SPANISH_VERBS);
  const [selectedVerb, setSelectedVerb] = useState<WordType | undefined>();
  const [taskResults, setTaskResults] = useState();

  const clickHandler = (e: MouseEvent) => {
    // @ts-ignore
    const verbId = e?.target?.id;
    const verb = data.irregularVerbs.find((i: any) => i.id === verbId);
    setSelectedVerb(verb);
  };

  const changeHandler = (val: string) => {
    // @ts-ignore
    const verb = data?.irregularVerbs?.find((i: any) => i.name === val);
    setSelectedVerb(verb);
  };
  // Record<keyof ConjugationType, string>
  const pronounsMap = {
    yo: 'yo',
    tu: 'tú',
    el: 'él',
    nosotros: 'nosotros',
    vosotros: 'vosotros',
    ellos: 'ellos'
  };

  const renderConj = () => {
    const conj = selectedVerb?.conjugation;
    // console.log('conj', conj);
    return (
      <table>
        {Object.keys(pronounsMap).map((key: string) => {
          return (
            <tr className="conjItem" key={key}>
              <td className="pronoun">{pronounsMap[key]}</td>
              <td>{conj[key]}</td>
            </tr>
          );
        })}
      </table>
    );
  };

  console.log('taskResults', taskResults);

  const submitHandler = (values: any) => {
    const results = {};
    Object.keys(pronounsMap).forEach((key: any) => {
      // @ts-ignore
      results[key] = {
        // @ts-ignore
        isCorrect: values[key] === selectedVerb.conjugation[key]
      };
    });
    // @ts-ignore
    setTaskResults(results);
  };

  const renderTask = () => {
    const fields = Object.keys(pronounsMap).map((key: any) => {
      return {
        name: key,
        label: key
      };
    });
    return (
      <Form className="task" fields={fields} onFormSubmit={submitHandler} />
    );
  };

  console.log('data', data);
  return (
    <PageLayout>
      <h1>Spanish verbs Conjugation</h1>
      {data && (
        <>
          <OptionBox
            options={data.irregularVerbs.map((verb: any) => verb.name)}
            type="radio"
            onChange={changeHandler}
            // @ts-ignore
            value={selectedVerb?.name}
          />
          {/* <ul className="verbsContainer">
            {data.irregularVerbs.map((verb: any) => {
              return (
                // @ts-ignore
                <Button onClick={clickHandler} key={verb.id} id={verb.id}>
                  {verb.name}
                </Button>
              );
            })}
          </ul> */}
          {/* <section className="hint"> */}
          {/* @ts-ignore */}
          {selectedVerb && (
            <>
              <p>
                {/* @ts-ignore */}
                {selectedVerb.name}: {selectedVerb.defs[0]}
              </p>
              <div className="verb">
                {renderTask()}
                <FlipCard
                  sideA="Show a hint"
                  sideB={renderConj()}
                  className="hint"
                />
              </div>
            </>
          )}
          {/* </section> */}
        </>
      )}
    </PageLayout>
  );
};

export default ConjugationPage;
