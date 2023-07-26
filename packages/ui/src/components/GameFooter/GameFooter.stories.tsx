import React from 'react';
import { GameFooter, GameFooterProps } from './GameFooter';
import '../../assets/styles/common-styles.css';

export default {
  title: 'GameFooter',
  component: GameFooter,
  argTypes: {
    prop: {
      control: { type: 'text' },
      defaultValue: 'prop text'
    }
  }
};

export const GameFooterDefault = (args: GameFooterProps) => {
  return (
    <div className="footer">
      <GameFooter {...args} />
    </div>
  );
};

export const GameFooterSuccess = (args: GameFooterProps) => {
  return (
    <div className="footer">
      <GameFooter {...args} variant="success" />
    </div>
  );
};

export const GameFooterError = (args: GameFooterProps) => {
  return (
    <div className="footer">
      <GameFooter {...args} variant="error" />
    </div>
  );
};
