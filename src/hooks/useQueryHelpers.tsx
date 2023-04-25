import { initUrqlClient } from 'next-urql';
import { useMemo } from 'react';
import { Client, OperationContext } from 'urql';

export const useQueryHelpers = (): Partial<OperationContext> => {
  const client: Client | null = initUrqlClient(
    {
      url: process.env.NEXT_PUBLIC_API_ENDPOINT as string,
      fetchOptions: {
        credentials: 'include',
      },
    },
    false
  );

  const context: Partial<OperationContext> = useMemo(() => {
    return {
      fetchOptions: {
        credentials: 'include',
      },
    };
  }, []);

  return { context, client };
};
