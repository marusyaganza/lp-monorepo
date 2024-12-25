import { authenticated } from '../../auth';
import { DEFAULT_LANGUAGE } from '../../constants/defaultValues';
import { DEFAULT_GAMES_SETTINGS } from '../../constants/defultGameSettings';
import { GAMES } from '../../constants/games';
import { QueryResolvers } from '../../generated/graphql';
import { IResolverContext } from '../../types/types';

export const gameQueryResolvers: QueryResolvers<IResolverContext> = {
  game: authenticated(async (_, { input }, { user, generateGameData }) => {
    return generateGameData(input, user.id);
  }),

  games: async (_, { language }) => {
    const lang = language || DEFAULT_LANGUAGE;

    return GAMES.filter(game => game.languages.includes(lang));
  },

  gameSettings: async () => {
    return DEFAULT_GAMES_SETTINGS;
  }
};
