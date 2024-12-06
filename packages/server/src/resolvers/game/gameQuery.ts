import { authenticated } from '../../auth';
import { DEFAULT_LANGUAGE } from '../../constants/defaultValues';
import { QueryResolvers } from '../../generated/graphql';
import { IResolverContext } from '../../types/types';
import { UserInputError } from '../../utils/apolloCustomErrors';

export const gameQueryResolvers: QueryResolvers<IResolverContext> = {
  game: authenticated(async (_, { input }, { user, generateGameData }) => {
    return generateGameData(input, user.id);
  }),

  games: async (_, { language }, { models }) => {
    const lang = language || DEFAULT_LANGUAGE;
    const games = await models.Game.findMany({
      languages: lang
    });
    if (!games) {
      throw new UserInputError(`no games for ${lang} language were found`);
    }
    return games;
  }
};
