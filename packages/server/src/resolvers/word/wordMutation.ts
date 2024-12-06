import { authorized } from '../../auth';
import {
  UserInputError,
  OperationResolutionError
} from '../../utils/apolloCustomErrors';
import { MutationResolvers, Role } from '../../generated/graphql';
import { IResolverContext } from '../../types/types';

export const wordMutationResolvers: MutationResolvers<IResolverContext> = {
  saveWord: authorized(Role.Member, async (_, { input }, { models, user }) => {
    const word = await models.Word.createOne({ ...input }, user.id);

    if (!word) {
      throw new OperationResolutionError(
        `saving word with name ${input.name} failed`
      );
    }

    return word;
  }),

  updateWord: authorized(
    Role.Member,
    async (_, { input }, { models, user }) => {
      const result = await models.Word.updateOne(input, user.id);
      if (!result?.ok || !result?.value) {
        throw new UserInputError(`updating word with id ${input.id} failed`);
      }
      return result.value;
    }
  ),

  saveGameResult: authorized(
    Role.Member,
    async (_, { input }, { models, user }) => {
      const result = await models.Word.updateStatistics(input, user?.id);
      if (!result?.ok) {
        throw new UserInputError(`saving training result failed`);
      }
      return 'Game result saved';
    }
  ),

  deleteWord: authorized(Role.Member, async (_, { id }, { models, user }) => {
    const result = await models.Word.deleteOne(id, user.id);
    if (!result?.ok) {
      throw new UserInputError(`deleting word with id ${id} failed`);
    }
    return `word with id ${id} was deleted`;
  })
};
