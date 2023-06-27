import React from 'react';
import { cn } from '../../utils/classnames';
import { AudioButton } from '../AudioButton/AudioButton';
import { Icon } from '../Icon/icon';
import { DictionaryEntity } from '../DictionaryEntity/DictionaryEntity';
import { Button } from '../Button/Button';
import { Word, WordDefinition } from '../../generated/graphql';

import styles from './WordCard.module.css';

export interface WordCardProps {
  /**Word to display */
  word: Word;
  /**additional styling */
  className?: string;
  /**edit button callback, if not provides, button will not be displayed */
  onEdit?: () => void;
  /**delete button callback, if not provides, button will not be displayed */
  onDelete?: () => void;
  /**short variant does not include word forms, examples and image */
  variant?: 'short' | 'full';
}

/**Component that displays word */
export const WordCard = ({
  word,
  className,
  onEdit,
  onDelete,
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
        if (example) {
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
      {onEdit && (
        <Button
          className={styles.editButton}
          variant="icon"
          iconId="edit"
          iconHeight={35}
          iconWidth={30}
          onClick={onEdit}
        >
          edit
        </Button>
      )}
      {onDelete && (
        <Button
          className={styles.deleteButton}
          variant="icon"
          iconId="delete"
          iconHeight={35}
          iconWidth={30}
          onClick={onDelete}
        >
          delete
        </Button>
      )}
    </div>
  );

  const renderHeader = () => (
    <header className={styles.header}>
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
    </header>
  );

  if (isFull) {
    return (
      <article className={cn(className, styles.wordContainer)}>
        {renderButtons()}
        <div className={styles.word}>
          {renderHeader()}
          {renderDefinition()}
          {stems?.length && (
            <section>
              <p className={styles.stems}>
                <span className={styles.stemsHeading}>Word forms: </span>
                {stems.join(', ')}
              </p>
            </section>
          )}
        </div>
        {imgUrl && (
          <figure className={styles.illustration}>
            <img
              className={styles.picture}
              src={imgUrl}
              alt={`${name} illustration`}
            />
            {imgDesc && (
              <figcaption>{<DictionaryEntity text={imgDesc} />}</figcaption>
            )}
          </figure>
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
