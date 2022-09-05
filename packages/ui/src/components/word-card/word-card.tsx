import React from 'react';
import { AudioButton } from '../audio-button/audio-button';
import { Icon } from '../Icon/icon';
import { DictionaryEntity } from '../dictionary-entity/dictionary-entity';
import { WordType } from '../../../../types/src/common-types';

import './word-card.css';

interface WordCardProps {
  word: WordType;
}

export const WordCard = ({ word }: WordCardProps) => {
  const { name, defs, particle, transcription, examples, audioUrl, imgUrl } =
    word;

  const renderExamples = (ex: string[] | undefined) => {
    if (!ex || !ex.length) return null;
    const listItems = ex.map(item => {
      return (
        <li className="examplesItem" key={item}>
          <DictionaryEntity className="examplesListInfo" text={item} />
        </li>
      );
    });
    return (
      <section className="examples">
        <details>
          <summary className="examplesTitle">Examples</summary>
          <ol className="examplesList">{listItems}</ol>
        </details>
      </section>
    );
  };
  const renderAudio = (
    transcription: string | undefined,
    audioUrl: string | undefined
  ) => {
    if (!audioUrl && !transcription) {
      return null;
    }
    return (
      <section className="audio">
        {audioUrl ? (
          <AudioButton
            buttonText={`[${transcription}]`}
            src={audioUrl}
            buttonSize={18}
          />
        ) : (
          <div className="transcription">[{transcription}]</div>
        )}
      </section>
    );
  };
  const renderDefs = (defsArr: string[]) => {
    if (!defsArr || !defsArr.length) return null;
    const list = defsArr.map(def => {
      return (
        <li className="defListItem" key={def}>
          <i className="textIcon">
            <Icon width={14} height={16} id="book" />
          </i>
          <p className="defItem">
            <DictionaryEntity text={def} />
          </p>
        </li>
      );
    });
    return <ul className="defsList">{list}</ul>;
  };

  return (
    <article className="word">
      <div>
        <div className="top">
          <header className="wordHeader">
            <span className="name">{name}</span>
            <span className="particle">{particle}</span>
            {renderAudio(transcription, audioUrl)}
          </header>
          <div className="controlsContainer"></div>
        </div>
        {renderDefs(defs)}
        {renderExamples(examples)}
      </div>
      {imgUrl && (
        <img
          className="image"
          src={imgUrl}
          alt={name}
          width={150}
          height={150}
        />
      )}
    </article>
  );
};
