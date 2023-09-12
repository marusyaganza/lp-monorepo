import React, { MouseEventHandler } from 'react';
import { cn } from '../../utils/classnames';
import { AudioButton } from '../AudioButton/AudioButton';
import { Icon } from '../Icon/icon';
import { DictionaryEntity } from '../DictionaryEntity/DictionaryEntity';
import { Button } from '../Button/Button';
import { Word, WordDefinition } from '../../generated/graphql';

import styles from './WordCard.module.css';

export type ActionButtonType = {
  callback: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
};

export interface WordCardProps {
  /**Word to display */
  word: Word;
  /**additional styling */
  className?: string;
  /**edit button properties, if not provides, button will not be displayed */
  editButton?: ActionButtonType;
  /**add button properties, if not provides, button will not be displayed */
  addButton?: ActionButtonType;
  /**delete button properties, if not provides, button will not be displayed */
  deleteButton?: ActionButtonType;
  /**short variant does not include word forms, examples and image */
  variant?: 'short' | 'full';
}

/**Component that displays word */
export const WordCard = ({
  word,
  className,
  editButton,
  addButton,
  deleteButton,
  variant = 'full'
}: WordCardProps) => {
  const {
    name,
    particle,
    audioUrl,
    transcription,
    level,
    isOffensive,
    defs,
    stems,
    imgUrl,
    imgDesc,
    shortDef
  } = word;

  const isFull = variant === 'full';

  const getOnClickHandler: (
    handler: () => void
  ) => MouseEventHandler<HTMLButtonElement> = (handler: () => void) => {
    return function (e) {
      e.stopPropagation();
      handler();
    };
  };

  const renderAudio = () => {
    if (!audioUrl && !transcription) {
      return null;
    }
    return (
      <section className="audio">
        {audioUrl ? (
          <AudioButton buttonText={`[${transcription}]`} src={audioUrl} />
        ) : (
          <div className="transcription">[{transcription}]</div>
        )}
      </section>
    );
  };

  const renderExamples = (examples: WordDefinition['examples']) => (
    <ul>
      {examples?.map(example => {
        if (example && example?.text) {
          return (
            <p key={example.text} className={styles.example}>
              <DictionaryEntity text={example.text} />
              {example.translation && ` (${example.translation})`}
            </p>
          );
        }
        return;
      })}
    </ul>
  );

  const renderDef = (def: string | null) => {
    if (def) {
      return (
        <p className={styles.definition}>
          <Icon
            className={styles.defIcon}
            width={30}
            height={20}
            id="book"
          ></Icon>
          <DictionaryEntity className={styles.defText} text={def} />
        </p>
      );
    }
    return;
  };

  const renderDefinition = () => {
    return (
      <ul>
        {defs.map(d => {
          if (d?.def) {
            return (
              <li key={d.def}>
                {renderDef(d.def)}
                {renderExamples(d.examples)}
              </li>
            );
          }
          return;
        })}
      </ul>
    );
  };

  const renderShortDefinition = () => {
    return (
      <ul>
        {shortDef.map(d => {
          return <li key={d}>{renderDef(d)}</li>;
        })}
      </ul>
    );
  };

  const renderButtons = () => (
    <div className={styles.buttons}>
      {editButton && (
        <Button
          className={styles.editButton}
          variant="primary"
          isActionButton
          iconId="edit"
          disabled={editButton?.isDisabled}
          isLoading={editButton?.isLoading}
          onClick={getOnClickHandler(editButton.callback)}
        >
          edit
        </Button>
      )}
      {deleteButton && (
        <Button
          className={styles.deleteButton}
          variant="danger"
          disabled={deleteButton?.isDisabled}
          isLoading={deleteButton?.isLoading}
          iconId="eraser"
          isActionButton
          onClick={getOnClickHandler(deleteButton.callback)}
        >
          delete
        </Button>
      )}
      {addButton && (
        <Button
          className={styles.addButton}
          variant="secondary"
          disabled={addButton.isDisabled}
          isLoading={addButton?.isLoading}
          iconId="plus"
          isActionButton
          onClick={getOnClickHandler(addButton.callback)}
        >
          Save
        </Button>
      )}
    </div>
  );

  const renderHeader = () => (
    <header className={styles.header}>
      <div className={styles.mainInfo}>
        <h3 className={styles.wordName}>{name}</h3>
        <span className={styles.particle}>{particle}</span>
        {renderAudio()}
        {level && <span className={styles.level}>{level}</span>}
        {isOffensive && (
          <span className={styles.offensive}>
            <Icon width={20} height={23} id="fire" />
            offensive
          </span>
        )}
      </div>
      {renderButtons()}
    </header>
  );

  if (isFull) {
    return (
      <article className={cn(className, styles.wordContainer)}>
        {renderHeader()}
        <div className={styles.wordContent}>
          <div className={styles.word}>{renderDefinition()}</div>
          {imgUrl && (
            <figure className={styles.illustration}>
              <img
                width={280}
                className={styles.picture}
                src={imgUrl}
                alt={`${name} illustration`}
              />
              {imgDesc && (
                <figcaption>{<DictionaryEntity text={imgDesc} />}</figcaption>
              )}
            </figure>
          )}
        </div>
        {!!stems?.length && (
          <section>
            <p className={styles.stems}>
              <span className={styles.stemsHeading}>Word forms: </span>
              {stems.join(', ')}
            </p>
          </section>
        )}
      </article>
    );
  }

  return (
    <article className={cn(className, styles.wordContainer)}>
      <div className={styles.word}>
        {renderHeader()}
        {isFull ? renderDefinition() : renderShortDefinition()}
      </div>
    </article>
  );
};
