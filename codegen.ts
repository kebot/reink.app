import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "packages/omnivore/schema.gql",
  documents: ["src/**/*.tsx"],
  generates: {
    "packages/omnivore/gql/": {
      preset: "client",
      config: {
        "withHooks": true
      },
      plugins: [
        // "typescript",
        // "typescript-operations",
        // "typescript-urql"
      ]
    }
  }
};

export default config;
