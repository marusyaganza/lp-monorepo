import React from 'react';
import { Game, GameProps } from './Game';
import '../../assets/styles/common-styles.css';
import { Game as GameType } from '../../generated/graphql';
import { styledPreviewDecorator } from '../../storybook-decorators';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof Game> = {
  title: 'Game',
  component: Game,
  decorators: [styledPreviewDecorator()]
};

const games = [
  {
    task: "Type the word that you've heard",
    type: GameType.Audio,
    question: [
      'https://media.merriam-webster.com/audio/prons/en/us/mp3/w/wheel001.mp3'
    ]
  },
  {
    task: 'Type a word that means',
    type: GameType.TypeWord,
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
    additionalInfo: {
      audioUrl:
        'https://media.merriam-webster.com/audio/prons/en/us/mp3/w/wheel001.mp3'
    }
  },
  {
    task: 'Select a definition that means',
    type: GameType.SelectDef,
    question: ['wheel'],
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
  }
];

export const GameDefault = (args: GameProps) =>
  games.map(game => {
    return (
      <div key={game.type} className="presentationBox" style={{ width: 600 }}>
        <Game {...args} {...game} />
      </div>
    );
  });

export const GameSuccess = (args: GameProps) =>
  games.map(game => {
    return (
      <div key={game.type} className="presentationBox" style={{ width: 600 }}>
        <Game
          {...args}
          {...game}
          currentResult={{ type: 'success', correctAnswer: 'wheel' }}
        />
      </div>
    );
  });

export const GameError = (args: GameProps) =>
  games.map(game => {
    return (
      <div key={game.type} className="presentationBox" style={{ width: 600 }}>
        <Game
          {...args}
          {...game}
          currentResult={{
            type: 'error',
            correctAnswer: 'wheel',
            incorrectAnswer: 'flower'
          }}
        />
      </div>
    );
  });

export default meta;
