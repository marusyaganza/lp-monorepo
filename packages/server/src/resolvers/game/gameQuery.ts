import { authenticated } from '../../auth';
import { DEFAULT_LANGUAGE } from '../../constants/defaultValues';
import { DEFAULT_GAMES_SETTINGS } from '../../constants/defultGameSettings';
import { GAMES } from '../../constants/games';
import { WordModel } from '../../db/models/Word/Word';
import { QueryResolvers } from '../../generated/graphql';
import { IResolverContext } from '../../types/types';

export const gameQueryResolvers: QueryResolvers<IResolverContext> = {
  game: authenticated(async (_, { input }, { user, generateGameData }) => {
    return generateGameData(input, user.id);
  }),

  games: authenticated(async (_, { input }, { user }) => {
    const lang = input?.language || DEFAULT_LANGUAGE;
    const configs = GAMES.filter(game => game.languages.includes(lang));
    return configs.map(async game => {
      const count = await WordModel.getWordsToPracticeCount(
        {
          gameType: game.type,
          language: lang,
          tags: input?.tags
        },
        user.id
      );
      return {
        ...game,
        wordsToPractice: count
      };
    });
  }),

  gameSettings: async () => {
    return DEFAULT_GAMES_SETTINGS;
  }
};
