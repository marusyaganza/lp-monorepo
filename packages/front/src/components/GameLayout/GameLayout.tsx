import React, { FormEventHandler } from 'react';
import styles from './GameLayout.module.css';
import { GameFooter, OptionBox, Progress, Button } from '@lp/ui';

const gameData = {
  question:
    'a hollow muscular organ of vertebrate animals that by its rhythmic contraction acts as a force pump maintaining the circulation of the blood',
  answer: 'heart',
  options: [
    'liver',
    'beaver',
    'heart',
    'egg',
    'honorificabilitudinitatibus',
    'foot'
  ],
  task: 'Choose the words that means:'
};

export const GameLayout = () => {
  const handleChange = (val: string) => {
    console.log('val', val);
  };

  const handlerSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
  };
  return (
    <div className={styles.container}>
      <header className={styles.progress}>
        <Progress value={10} />
        <Button variant="icon" iconId="close" iconHeight={30}>
          Exit game
        </Button>
      </header>
      <main className={styles.game}>
        <article>
          <p className={styles.task}>{gameData.task}</p>
          <p className={styles.question}>{gameData.question}</p>
          <form className={styles.answer} onSubmit={handlerSubmit}>
            <OptionBox options={gameData.options} onChange={handleChange} />
            <Button type="submit" variant="secondary">
              Check
            </Button>
          </form>
        </article>
      </main>
      <GameFooter />
    </div>
  );
};
