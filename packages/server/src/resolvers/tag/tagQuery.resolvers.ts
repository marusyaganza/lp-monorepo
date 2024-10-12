import { authenticated } from '../../auth';
import { DEFAULT_LANGUAGE } from '../../constants/defaultValues';
import { QueryResolvers } from '../../generated/graphql';
import { IResolverContext } from '../../types/types';

export const tagQueryResolvers: QueryResolvers<IResolverContext> = {
  tags: authenticated(async (_, { language }, { models, user }) => {
    const tags = await models.WordTag.findMany(
      {
        language: language || DEFAULT_LANGUAGE
      },
      user.id
    );
    return tags;
  })
};
