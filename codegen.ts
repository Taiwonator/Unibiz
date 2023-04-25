import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';

dotenv.config();

const config: CodegenConfig = {
  schema: [
    {
      [process.env.API_ENDPOINT as string]: {
        headers: {
          Authorization: 'Bearer from codegen',
        },
      },
    },
  ],
  documents: ['src/graphql/**/*.graphql.ts', 'src/graphql/**/**/*.graphql.ts'],
  ignoreNoDocuments: true,
  generates: {
    'generated/graphql.tsx': {
      plugins: ['typescript', 'typescript-operations', 'typescript-urql'],
      config: {
        withComponent: false,
        withHooks: true,
      },
    },
  },
};
export default config;
