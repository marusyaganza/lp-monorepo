import { authorized } from '../../auth';
import {
  UserInputError,
  OperationResolutionError
} from '../../utils/apolloCustomErrors';
import { MutationResolvers, Role } from '../../generated/graphql';
import { IResolverContext } from '../../types/types';

export const tagMutationResolvers: MutationResolvers<IResolverContext> = {
  createTag: authorized(Role.Member, async (_, { input }, { models, user }) => {
    const existing = await models.WordTag.findOne(
      {
        text: input.text
      },
      user.id
    );

    if (existing) {
      throw new UserInputError(`tag with text ${input?.text} is already added`);
    }
    const tag = await models.WordTag.createOne(input, user.id);
    if (!tag || !tag?.id) {
      throw new OperationResolutionError(`creating tag operation failed`);
    }
    return `tag ${tag?.text} was created successfully`;
  }),

  updateTag: authorized(Role.Member, async (_, { input }, { models, user }) => {
    const result = await models.WordTag.updateOne(input, user.id);
    if (!result?.ok) {
      throw new UserInputError(`updating tag with id ${input.id} failed`);
    }
    return `tag ${result?.value?.text} was updated`;
  }),

  deleteTag: authorized(Role.Member, async (_, { id }, { models, user }) => {
    const result = await models.WordTag.deleteOne(id, user.id);
    if (!result?.ok || !result?.value) {
      throw new UserInputError(`deleting tag with id ${id} failed`);
    }
    return result.value;
  })
};
