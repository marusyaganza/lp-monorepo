import React from 'react';
import { GameFooter, GameFooterVariant } from './GameFooter';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof GameFooter> = {
  title: 'GameFooter',
  component: GameFooter
};

const variants: GameFooterVariant[] = [
  'initial',
  'success',
  'error',
  'inProgress'
];

export const GameFooterDemo = () =>
  variants.map(variant => (
    <div key={variant}>
      <h3 className="presentationBox">{variant}</h3>
      <div className="page">
        <GameFooter variant={variant} />
      </div>
    </div>
  ));

export default meta;
