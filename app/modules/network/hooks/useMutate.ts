import { useMutation, UseMutationOptions } from "@tanstack/react-query";

interface MutateOptions<
  TData,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
> extends UseMutationOptions<TData, TError, TVariables, TContext> {
  mutationFn: (variables: TVariables) => Promise<TData>;
}

/**
 * Custom hook to encapsulate mutation logic using React Query.
 *
 * @template TData - Type of data returned by the mutation.
 * @template TError - Type of the error that may occur during the mutation.
 * @template TVariables - Type of variables required by the mutation.
 * @template TContext - Type of the optional mutation context.
 *
 * @param {MutateOptions<TData, TError, TVariables, TContext>} options - Options for the mutation.
 * @returns {ReturnType<typeof useMutation>} - Result of the mutation.
 */
export const useMutate = <
  TData,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
>({
  mutationFn,
  ...options
}: MutateOptions<TData, TError, TVariables, TContext>) =>
  useMutation<TData, TError, TVariables, TContext>({
    mutationFn,
    ...options,
  });
