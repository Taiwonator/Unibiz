import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:4000',
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
