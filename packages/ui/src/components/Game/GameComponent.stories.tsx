import React from 'react';
import { GameComponent, GameComponentProps } from './GameComponent';
import '../../assets/styles/common-styles.css';
import { Game as GameType } from '../../generated/graphql';
import { styledPreviewDecorator } from '../../storybook-decorators';
import type { Meta } from '@storybook/react';
import { GameStage } from '../../types/gameTypes';

const meta: Meta<typeof GameComponent> = {
  title: 'game/GameComponent',
  component: GameComponent,
  decorators: [styledPreviewDecorator()]
};

const games = [
  {
    task: "Type the word that you've heard",
    type: GameType.Audio,
    correctAnswer: ['wheel'],
    question: [
      'https://media.merriam-webster.com/audio/prons/en/us/mp3/w/wheel001.mp3'
    ]
  },
  {
    task: 'Type a word that means',
    type: GameType.TypeWord,
    correctAnswer: ['wheel'],
    question: [
      'a circular frame of hard material that may be solid, partly solid, or spoked and that is capable of turning on an axle',
      'a contrivance or apparatus having as its principal part a wheel: such as',
      'a chiefly medieval instrument of torture designed for mutilating a victim (as by stretching or disjointing)'
    ],
    additionalInfo: {
      audioUrl:
        'https://media.merriam-webster.com/audio/prons/en/us/mp3/w/wheel001.mp3'
    }
  },
  {
    task: 'Select a word that means',
    type: GameType.SelectWord,
    question: [
      'a circular frame of hard material that may be solid, partly solid, or spoked and that is capable of turning on an axle',
      'a contrivance or apparatus having as its principal part a wheel: such as',
      'a chiefly medieval instrument of torture designed for mutilating a victim (as by stretching or disjointing)'
    ],
    options: ['forefront', 'name', 'apple', 'wheel', 'pear', 'steep'],
    correctAnswer: ['wheel'],
    additionalInfo: {
      audioUrl:
        'https://media.merriam-webster.com/audio/prons/en/us/mp3/w/wheel001.mp3'
    }
  },
  {
    task: 'Select a definition that means',
    type: GameType.SelectDef,
    question: ['wheel'],
    correctAnswer: [
      'a circular frame of hard material that may be solid, partly solid, or spoked and that is capable of turning on an axle'
    ],
    options: [
      'a person or thing that is different from or in a position away from others in the group',
      'a small piece of rubber or other material that is used to erase something you have written or drawn —called also (British) rubber',
      'to get information or a reaction from somebody, often with difficulty.',
      'a brief authoritative formula of religious belief',
      'a circular frame of hard material that may be solid, partly solid, or spoked and that is capable of turning on an axle',
      'a cat or kitten : pussycat—used especially by children or when talking to children'
    ],
    additionalInfo: {
      audioUrl:
        'https://media.merriam-webster.com/audio/prons/en/us/mp3/w/wheel001.mp3'
    }
  },
  {
    task: 'Conjugate the verb',
    type: GameType.Conjugation,
    question: ['caer'],
    correctAnswer: ['caigo', 'caes', 'cae', 'caemos', 'ca\u00e9is', 'caen'],
    additionalInfo: {
      audioUrl:
        'https://media.merriam-webster.com/audio/prons/en/us/mp3/w/wheel001.mp3'
    }
  },
  {
    question: ['ecologista'],
    type: GameType.Gender,
    correctAnswer: ['masculine', 'feminine'],
    additionalInfo: {
      audioUrl:
        'https://voice.reverso.net/RestPronunciation.svc/v1/output=json/GetVoiceStream/voiceName=Maria22k?voiceSpeed=80&inputText=ZWNvbG9naXN0YQ==',
      shortDef: '<b>ecologista means</b> ecologist, environmentalist'
    }
  }
];

export const GameDefault = (args: GameComponentProps) =>
  games.map(game => {
    return (
      <div key={game.type} className="presentationBox" style={{ width: 600 }}>
        <GameComponent {...args} {...game} />
      </div>
    );
  });

export const GameSuccess = (args: GameComponentProps) =>
  games.map(game => {
    return (
      <div key={game.type} className="presentationBox" style={{ width: 600 }}>
        <GameComponent
          {...args}
          {...game}
          currentResult={{ type: GameStage.Success }}
        />
      </div>
    );
  });

export const GameError = (args: GameComponentProps) =>
  games.map(game => {
    return (
      <div key={game.type} className="presentationBox" style={{ width: 600 }}>
        <GameComponent
          {...args}
          {...game}
          currentResult={{
            type: GameStage.Error
          }}
        />
      </div>
    );
  });

export default meta;
