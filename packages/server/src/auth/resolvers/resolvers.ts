import {
  AuthenticationError,
  AuthorizationError
} from '../../utils/apolloCustomErrors';
import { Role, ResolverFn } from '../../generated/graphql';
import { IResolverContext, IAutenticatedContext } from '../../types/types';
import { isAutenticatedContext } from '../../types/typeGuards';

export function authenticated<TResult, TParent, TArgs>(
  next: ResolverFn<TResult, TParent, IAutenticatedContext, TArgs>
): ResolverFn<TResult, TParent, IResolverContext, TArgs> {
  return async (root, args, context, info) => {
    if (!isAutenticatedContext(context)) {
      throw new AuthenticationError();
    }
    const existingUser = await context?.models?.User?.findOne({
      id: context.user.id
    });
    if (!existingUser) {
      throw new AuthenticationError();
    }
    return next(root, args, context, info);
  };
}

export function authorized<TResult, TParent, TArgs>(
  role: Role,
  next: ResolverFn<TResult, TParent, IAutenticatedContext, TArgs>
): ResolverFn<TResult, TParent, IResolverContext, TArgs> {
  return async (root, args, context, info) => {
    if (!isAutenticatedContext(context)) {
      throw new AuthorizationError();
    }
    const existingUser = await context?.models?.User?.findOne({
      id: context.user.id
    });
    if (existingUser?.role !== role) {
      throw new AuthorizationError();
    }
    return next(root, args, context, info);
  };
}
