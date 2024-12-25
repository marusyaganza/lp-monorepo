import { Game } from '../../../generated/graphql';
import { AudioGame } from './AudioGame/AudioGame';
import { ConjugationGame } from './ConjugationGame/ConjugationGame';
import { GenderGame } from './GenderGame/GenderGame';
import { SelectDefGame } from './SelectDefGame/SelectDefGame';
import { SelectWordGame } from './SelectWordGame/SelectWordGame';
import { TypeWordGame } from './TypeWordGame/TypeWordGame';

export const games = {
  [Game.Audio]: AudioGame,
  [Game.TypeWord]: TypeWordGame,
  [Game.SelectDef]: SelectDefGame,
  [Game.SelectWord]: SelectWordGame,
  [Game.Conjugation]: ConjugationGame,
  [Game.Gender]: GenderGame
};
