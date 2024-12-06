import { authenticated } from '../../auth';
import { QueryResolvers } from '../../generated/graphql';
import { IResolverContext } from '../../types/types';
import { UserInputError } from '../../utils/apolloCustomErrors';

export const userQueryResolvers: QueryResolvers<IResolverContext> = {
  user: authenticated(async (_, __, { models, user }) => {
    const result = await models.User.findOne({ id: user?.id });
    if (!result) {
      throw new UserInputError(`user is not found`);
    }
    return result;
  })
};
