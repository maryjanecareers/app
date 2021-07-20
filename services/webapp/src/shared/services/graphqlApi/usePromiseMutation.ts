import {
  MutationConfig,
  MutationParameters,
  IEnvironment,
  GraphQLTaggedNode,
  Disposable,
  PayloadError,
} from 'relay-runtime';
import Relay, { UseMutationConfig } from 'react-relay';

export function usePromiseMutation<TMutation extends MutationParameters>(
  mutation: GraphQLTaggedNode,
  commitMutationFn?: (
    environment: IEnvironment,
    config: Omit<MutationConfig<TMutation>, 'onCompleted' | 'onError'>
  ) => Disposable
) {
  const [originalCommit, ...other] = Relay.useMutation<TMutation>(mutation, commitMutationFn);

  const commit = (config: UseMutationConfig<TMutation>) => {
    return new Promise<{
      response: TMutation['response'];
      errors: PayloadError[] | null;
    }>((resolve, reject) => {
      originalCommit({
        ...config,
        onCompleted: (response, errors) => {
          resolve({ response, errors });
        },
        onError: reject,
      });
    });
  };

  return [commit, ...other] as const;
}
